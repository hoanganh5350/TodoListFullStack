import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateTaskType {
  adminId: number;
  taskTitle: string;
  status: string;
  approveMember: boolean;
  createdBy: string;
}

const CreateTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data: CreateTaskType = req.body;
      const Tasks = await prisma.task.create({ data });
      res.status(200).json(Tasks);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default CreateTask;
