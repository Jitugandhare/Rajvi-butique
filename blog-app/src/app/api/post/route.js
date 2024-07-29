import { connectToDatabase } from '@/utils/mongodb';
import BlogPost from "@/Models/post";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

export async function GET(request) {
  await connectToDatabase();
  try {
    const blogPosts = await BlogPost.find().populate("author");
    if (!blogPosts.length) {
      return NextResponse.json({ success: false, data: [], msg: "No Blog Posts available" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blogPosts }, { status: 200 });
  } catch (error) {
    console.log("GET Error:", error);
    return NextResponse.json({ success: false, msg: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const requestBody = await request.json();
    const token = request.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, msg: "Invalid Token. Please log in again." },
        { status: 401 }
      );
    }
    const { image, title, description, content } = requestBody;
    if (!title || !description || !content || !image) {
      return NextResponse.json({ success: false, msg: "Please provide all required fields" }, { status: 400 });
    }
    const newBlogPost = new BlogPost({
      image,
      title,
      description,
      content,
      author: decodedToken.UserId
    });
    await newBlogPost.save();

    return NextResponse.json({ success: true, data: newBlogPost, msg: "Blog has been created" }, { status: 201 });
  } catch (error) {
    console.log("POST Error:", error);
    return NextResponse.json({ success: false, msg: "Internal server error" }, { status: 500 });
  }
}
