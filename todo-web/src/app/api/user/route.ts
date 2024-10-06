import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.user.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: any) {
  const data = await request.json();
  const task = await prisma.user.create({ data });
  return NextResponse.json(task);
}
