import { connectToDatabase } from "@/utils/mongodb";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    const body = await request.json(); 
    const { action } = body;

    switch (action) {
      case "register":
        return handleRegister(body);
      case "login":
        return handleLogin(body);
      default:
        return NextResponse.json(
          { success: false, msg: "Invalid endpoint" },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return NextResponse.json(
        { success: false, msg: "Invalid token. Please log in again." },
        { status: 401 }
      );
    }

    const { UserId } = decode;
    const profile = await User.findById(UserId);
    if (!profile) {
      return NextResponse.json(
        { success: false, msg: "Invalid user. Please register." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Profile fetched successfully", data: profile },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleRegister({ name, email, password, image }) {
  try {
    await connectToDatabase();

    if (!name || !email || !password || !image) {
      return NextResponse.json(
        { success: false, msg: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, msg: "User already exists with this email" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hash,
      image,
    });
    await user.save();

    return NextResponse.json(
      { success: true, msg: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleLogin({ email, password }) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    const serializedToken = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    const response = NextResponse.json(
      { success: true, msg: 'Login successful' },
      { status: 200 }
    );
    response.headers.set('Set-Cookie', serializedToken);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}
