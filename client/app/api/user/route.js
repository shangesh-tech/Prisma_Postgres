import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: { name, email, password },
  });
  return NextResponse.json(user, { status: 201 });
}

export async function PUT(request) {
  const { id, name, email, password } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
