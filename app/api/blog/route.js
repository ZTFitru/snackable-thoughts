import { ConnectDB } from "@/library/config/db";
import BlogModel from "@/library/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./public";

async function connectDBIfNotConnected() {
    if (!global.dbConnected) {
        await ConnectDB();
        global.dbConnected = true;
    }
}

async function saveFile(file, prefix) {
    const timestamp = Date.now();
    const fileByteData = await file.arrayBuffer();
    const buffer = Buffer.from(fileByteData);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filePath = `${UPLOAD_DIR}/${timestamp}_${prefix}_${sanitizedFileName}`;
    await writeFile(filePath, buffer);
    return `/${timestamp}_${prefix}_${sanitizedFileName}`;
}

connectDBIfNotConnected();

export async function GET(req) {
    try {
        await connectDBIfNotConnected();
        const blogId = req.nextUrl.searchParams.get("id");

        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json(blog);
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDBIfNotConnected();

        const formData = await req.formData();
        const image = formData.get("image");
        const authorImg = formData.get("authorImg");
        if (!formData.get("title") || !formData.get("description") || !formData.get("author")) {
            return NextResponse.json({ success: false, msg: "Invalid form data" }, { status: 400 });
        }
        if (!image || !["image/jpeg", "image/png"].includes(image.type)) {
            return NextResponse.json({ success: false, msg: "Invalid blog image format" }, { status: 400 });
        }
        if (!authorImg || !["image/jpeg", "image/png"].includes(authorImg.type)) {
            return NextResponse.json({ success: false, msg: "Invalid author image format" }, { status: 400 });
        }
        const imgUrl = await saveFile(image, "thumbnail");
        const authorImgUrl = await saveFile(authorImg, "author");
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            author: formData.get("author"),
            image: imgUrl,
            authorImg: authorImgUrl,
        };
        await BlogModel.create(blogData);

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }

    
}

export async function DELETE(request) {
    try {
      const id = request.nextUrl.searchParams.get("id");
      
      if (!id) {
        return NextResponse.json(
          { success: false, msg: "Blog ID is required." },
          { status: 400 }
        );
      }
  
      const deletedBlog = await BlogModel.findByIdAndDelete(id);
  
      if (!deletedBlog) {
        return NextResponse.json(
          { success: false, msg: "Blog not found." },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, msg: "Blog deleted successfully." });
    } catch (error) {
      console.error("Error deleting blog:", error);
      return NextResponse.json(
        { success: false, msg: "An error occurred while deleting the blog." },
        { status: 500 }
      );
    }
}