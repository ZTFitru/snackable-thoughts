"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { assets } from "@/assets/assets";

const page = () => {
  const [image, setImage] = useState(false);
  const [authorImage, setAuthorImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
    authorImg: "/author_img.png",
  });

  const onChangeHanler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", authorImage);
    formData.append("image", image);

    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setAuthorImage(false);
      setData({
        title: "",
        description: "",
        category: "Tech",
        author: "",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-base font-semibold text-gray-700">
          Upload Thumbnail
        </p>
        <label htmlFor="image">
          <Image
            className="mt-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-base font-semibold text-gray-700">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHanler}
          value={data.title}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="text"
          placeholder="Title here..."
          required
        />
        <p className="text-base font-semibold text-gray-700">Author</p>
        <input
          name="author"
          onChange={onChangeHanler}
          value={data.author}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="text"
          placeholder="Name here..."
          required
        />
        {/* maybe below */}
        <p className="text-base font-semibold text-gray-700">
          Upload Author Image
        </p>
        <label htmlFor="authorImg">
          <Image
            className="mt-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500"
            src={
              !authorImage
                ? assets.upload_area
                : URL.createObjectURL(authorImage)
            }
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setAuthorImage(e.target.files[0])}
          type="file"
          id="authorImg"
          hidden
          required
        />
        {/* maybe above */}
        <p className="text-base font-semibold text-gray-700">
          Blog Description
        </p>
        <textarea
          name="description"
          onChange={onChangeHanler}
          value={data.description}
          className="w-full sm:w-[500px] mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="text"
          placeholder="write content here"
          rows={6}
          required
        />
        <p className="text-base font-semibold text-gray-700">Blog Category</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {["Tech", "Sports", "Entertainment", "Education"].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                onChangeHanler({
                  target: { name: "category", value: category },
                })
              }
              className={`px-2 py-2 text-sm rounded-md border transition-all ${
                data.category === category
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <br />
        <button
          type="submit"
          className="mt-6 w-40 h-12 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-900 hover:shadow-lg transition-all"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default page;
