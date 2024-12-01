import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const cookiesHeader = req.headers.cookie;

      if (!cookiesHeader) {
        return res.status(200).json({ auth: false, dataUser: null });
      }

      // Phân tích cookies thủ công
      const cookies = Object.fromEntries(
        cookiesHeader.split("; ").map((cookie) => {
          const [key, value] = cookie.split("=");
          return [key, decodeURIComponent(value)];
        })
      );
      const token = cookies.Access_token;
      const userId = Number(cookies.user_id);
      if (!token || !userId) {
        return res.status(200).json({ auth: false, dataUser: null });
      }
      const tokenDetail = await prisma.accessToken.findFirst({
        where: {
          userId: userId,
          token: token,
        },
      });

      if (!tokenDetail) {
        return res.status(200).json({ auth: false, dataUser: null });
      }
      const timeCheck = new Date().getTime() < Number(tokenDetail.expiredAt);
      if (timeCheck) {
        const usersDb = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        const { password, ...users } = usersDb as any;
        if (users) {
          return res.status(200).json({ auth: timeCheck, dataUser: users });
        } else {
          return res.status(400).json({ error: "User not found" });
        }
      } else {
        return res.status(400).json({ error: "Token expires" });
      }
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default getToken;
