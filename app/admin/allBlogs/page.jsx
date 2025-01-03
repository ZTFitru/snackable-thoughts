"use client";
import BlogTable from "@/components/AdminComponents/BlogTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogs = async (mongoId) => {
    const userCode = prompt('Enter the 4-digit code to confirm deletion:');
    if (userCode !== process.env.NEXT_PUBLIC_DELETE_CODE) {
        toast.error('Incorrect code. Blog deletion canceled.');
        return;
    }
    try {
      const response = await axios.delete("/api/blog", {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error("Error deleting blog");
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-0 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        {loading ? (
          <p>Loading blogs....</p>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <caption className="sr-only">List of all blogs</caption>
            <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
              <tr>
                <th scope="col" className="hidden sm:block px-6 py-3">
                  Author Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Blog Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => (
                <BlogTable
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlogs}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default page;
