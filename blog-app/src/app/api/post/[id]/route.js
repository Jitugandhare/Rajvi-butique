import { connectToDatabase } from '@/utils/mongodb';
import Blog from "@/Models/post";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const authenticateToken = async (request) => {
  const token = request.headers.get('authorization');
  if (!token) {
    return { error: "Unauthorized access. Please log in.", status: 401 };
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return { decoded };
  } catch (error) {
    return { error: "Invalid token. Please log in again.", status: 401 };
  }
};

export async function GET(request, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const { error, decoded, status } = await authenticateToken(request);

    if (error) {
      return NextResponse.json({ success: false, msg: error }, { status });
    }

    const blog = await Blog.findById(id).populate("author");
    if (!blog) {
      return NextResponse.json({ success: false, msg: "No Blog Posts available. Invalid ID." }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Individual blog fetched successfully", data: blog }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const { error, decoded, status } = await authenticateToken(request);

    if (error) {
      return NextResponse.json({ success: false, msg: error }, { status });
    }

    const { title, description, content, image } = body;

    if (!title || !description || !content || !image) {
      return NextResponse.json({ success: false, msg: "Please provide all required fields" }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      image,
      author: decoded.UserId,
    });

    await newBlog.save();

    return NextResponse.json({ success: true, msg: "Blog created successfully", data: newBlog }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const body = await request.json();
    const { error, decoded, status } = await authenticateToken(request);

    if (error) {
      return NextResponse.json({ success: false, msg: error }, { status });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Invalid ID" }, { status: 404 });
    }

    if (blog.author.toString() !== decoded.UserId) {
      return NextResponse.json({ success: false, msg: "You are not authorized to edit this blog" }, { status: 403 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: body.title || blog.title,
        description: body.description || blog.description,
        content: body.content || blog.content,
        image: body.image || blog.image,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, msg: "Blog has been updated", data: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const { error, decoded, status } = await authenticateToken(request);

    if (error) {
      return NextResponse.json({ success: false, msg: error }, { status });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Invalid ID" }, { status: 404 });
    }

    if (blog.author.toString() !== decoded.UserId) {
      return NextResponse.json({ success: false, msg: "You are not authorized to delete this blog" }, { status: 403 });
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog has been deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}
