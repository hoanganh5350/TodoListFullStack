import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { sha256 } from "../../../../utils/func";

const prisma = new PrismaClient();

interface LoginType {
  email: string;
  password: string;
}

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      //body request
      const payload: LoginType = req.body;
      if (!payload) {
        return res.status(400).json({ error: "Invalid request parameters" });
      }
      //calc time expires
      const currentTime: Date = new Date();
      const expiresTime = currentTime.setMinutes(
        currentTime.getMinutes() + 360
      );
      const usersDb = await prisma.user.findUnique({
        where: {
          email: payload.email,
          password: payload.password,
        },
      });

      const { password, ...users } = usersDb as {
        id: number;
        userName: string;
        email: string;
        password: string;
      };

      const passwordHash = sha256(payload.password);

      if (users && password && payload.password === password) {
        const tokenCheck = await sha256(
          JSON.stringify({
            id: users.id,
            userName: users.userName,
            email: users.email,
            password: passwordHash,
            time: currentTime,
          })
        );

        const Token = await prisma.accessToken.create({
          data: {
            userId: users.id,
            token: tokenCheck,
            expiredAt: String(expiresTime),
          },
        });

        await res.setHeader("Set-Cookie", [
          `Access_token=${Token?.token}; Max-Age=21600; Path=/; HttpOnly`,
          `user_id=${users.id}; Max-Age=21600; Path=/; HttpOnly`,
        ]);

        res.status(200).json(Token);
      }
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default Login;
