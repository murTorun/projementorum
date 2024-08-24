import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, reftype } = await req.json();

    // Update or add reftype in the user document
    const result = await User.updateOne(
      { email },
      { $set: { reftype } },
      { upsert: true }
    );

    return NextResponse.json({
      success: result.modifiedCount > 0 || result.upsertedCount > 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
