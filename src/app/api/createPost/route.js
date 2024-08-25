import { connectMongoDB } from "@/app/lib/mongodb";
import Post from "@/app/models/post";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      title,
      description,
      tags,
      linkedin,
      email,
      src,
      type,
      loggedEmail,
    } = await req.json(); // Destructure form data
    if (!loggedEmail) {
      return NextResponse.json(
        { message: "Logged email is required" },
        { status: 400 }
      );
    }
    console.log("logged email: ", loggedEmail);
    await connectMongoDB();

    // Create a new post in the database

    const newPost = await Post.create({
      name,
      title,
      description,
      tags,
      linkedin,
      email,
      src,
      type,
      loggedEmail,
    });
    console.log(newPost);
    await User.findOneAndUpdate(
      { email: loggedEmail },
      { createdPost: true },
      { new: true }
    );

    return NextResponse.json(
      { message: "Post created successfully", post: newPost, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating post", error: error },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.findOne({ email }).select("createdPost");

    if (!user || !user.createdPost) {
      return NextResponse.json(
        { message: "User has not created a post yet" },
        { status: 404 }
      );
    } else {
      const post = await Post.find({ loggedEmail: email });
      console.log(post);
      return NextResponse.json({ post });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const {
      name,
      title,
      description,
      tags,
      linkedin,
      email,
      src,
      type,
      loggedEmail,
    } = await req.json();
    await connectMongoDB();

    // Find and update the existing post
    const updatedPost = await Post.findOneAndUpdate(
      { loggedEmail },
      {
        name,
        title,
        description,
        tags,
        linkedin,
        email,
        src,
        type,
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Post updated successfully",
        post: updatedPost,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating post", error: error },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const deletedPost = await Post.findOneAndDelete({ loggedEmail: email });
    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await User.findOneAndUpdate(
      { email },
      { createdPost: false },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Post deleted successfully",
        post: deletedPost,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post", error: error },
      { status: 500 }
    );
  }
}
