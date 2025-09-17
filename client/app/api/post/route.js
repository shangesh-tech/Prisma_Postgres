import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Better error handling and selective field retrieval
export async function GET(request) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function GET_POSTS_BY_USER(request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: { authorId: userId },
  });
  return NextResponse.json(posts, { status: 200 });
}

export async function GET_POSTS_BY_CATEGORY(request) {
  const { category } = await request.json();

  if (!category) {
    return NextResponse.json({ error: "Missing category" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: { category: category },
  });
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(request) {
  const { title, content, published, category, authorId } =
    await request.json();
  const post = await prisma.post.create({
    data: { title, content, published, category, authorId },
  });
  return new Response(JSON.stringify(post), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  const { id, title, content, published, category } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
  }

  const data = {};
  if (title !== undefined) data.title = title;
  if (content !== undefined) data.content = content;
  if (published !== undefined) data.published = published;
  if (category !== undefined) data.category = category;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id },
    data,
  });
  return NextResponse.json(post, { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
  }

  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
