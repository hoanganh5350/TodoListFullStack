import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface formSubmit {
  token?: string;
  userId?: number;
}

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const responsePass = { auth: true };
    const responseFailed = { auth: false };
    try {
      const { token, userId }: formSubmit = req.body;
      if (!token || !userId) {
        return res.status(200).json(responseFailed);
      }
      const tokenDetail = await prisma.accessToken.findFirst({
        where: {
          userId: userId,
          token: token,
        },
      });
      if (!tokenDetail) {
        return res.status(200).json(responseFailed);
      }
      const timeCheck = new Date().getTime() < Number(tokenDetail.expiredAt);
      return res.status(200).json(timeCheck ? responsePass : responseFailed);
    } catch (error) {
      return res.status(200).json(responseFailed);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default Auth;
