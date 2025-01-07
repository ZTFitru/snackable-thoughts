import { NextResponse } from "next/server";
import { ConnectDB } from "@/library/config/db";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  blogId: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export async function POST(request) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { name, email, comment, blogId } = body;

    if (!name || !email || !comment || !blogId) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newComment = new Comment({
      name,
      email,
      comment,
      blogId,
    });

    const savedComment = await newComment.save();

    return NextResponse.json(
      { success: true, data: savedComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { error: "Failed to save comment." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await ConnectDB();

    const url = new URL(request.url);
    const blogId = url.searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required." },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments." },
      { status: 500 }
    );
  }
}