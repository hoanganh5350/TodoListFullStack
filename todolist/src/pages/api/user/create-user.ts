import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserType {
  fristName: string;
  lastName: string;
  avatars?: string;
  birthday?: string;
  phone: string;
  email: string;
  address: string;
  userName: string;
  password: string;
}

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data: CreateUserType = req.body;
      const users = await prisma.user.create({ data });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default CreateUser;
