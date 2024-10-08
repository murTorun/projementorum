import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const { name, surname, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const url = new URL(req.url);

    const reftype = url.searchParams.get("reftype");

    await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      reftype,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error },
      { status: 500 }
    );
  }
}
