import { connectMongoDB } from "@/app/lib/mongodb";
import Post from "@/app/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const searchQuery = searchParams.get("searchQuery") || "";
    const searchType = searchParams.get("searchType") || "";
    const education = searchParams.get("education") || "";
    const location = searchParams.get("location") || "";

    const skip = (page - 1) * limit;

    await connectMongoDB();

    const query = {};

    if (searchQuery.trim()) {
      query.$or = [
        { name: { $regex: searchQuery.trim(), $options: "i" } },
        { title: { $regex: searchQuery.trim(), $options: "i" } },
        { description: { $regex: searchQuery.trim(), $options: "i" } },
        { tags: { $in: [new RegExp(searchQuery.trim(), "i")] } },
      ];
    }

    if (searchType.trim()) {
      query.type = searchType.trim();
    }

    if (education.trim()) {
      query.educationLevels = {
        $in: education.split(",").map((e) => e.trim()),
      };
    }

    if (location.trim()) {
      query.location = location.trim();
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);
    const hasMore = totalPosts > skip + limit;

    console.log(totalPosts);
    return NextResponse.json({ posts, hasMore, totalPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Error fetching posts", error: error.message },
      { status: 500 }
    );
  }
}
