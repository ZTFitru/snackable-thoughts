import { ConnectDB } from "@/library/config/db";
import EmailModel from "@/library/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();
    const emailData = {
      email: formData.get("email"),
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to subscribe email" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await ConnectDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to retrieve emails" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "ID is required" },
        { status: 400 }
      );
    }
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to delete email" },
      { status: 500 }
    );
  }
}