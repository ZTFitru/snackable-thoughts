import { ConnectDB } from "@/library/config/db";
import UserModel from "@/library/models/UserModel";
import { NextResponse } from "next/server";

const LoadDB = async ()=> {
    await ConnectDB();
  }
  LoadDB()

export async function POST(request) {
    const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
  }

  await UserModel.create({ name, email, password });
  return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
}