"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TfiThought } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SlSocialYoutube } from "react-icons/sl";
import Footer from "@/components/Footer";
import LoginPopUp from "@/components/LoginPopUp"; 
import Link from "next/link";
import axios from "axios";
import Comments from "@/components/Comments";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const fetchData = async () => {
    const resolvedParams = await params;
    const response = await axios.get("/api/blog", {
      params: { id: resolvedParams.id },
    });
    setData(response.data);
    const commentsResponse = await axios.get(`/api/comments?blogId=${resolvedParams.id}`);
    setComments(commentsResponse.data);

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.name || !commentData.email || !commentData.comment) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/comments", {
        blogId: params.id,
        ...commentData,
      })
      setComments((prev) => [...prev, response.data]);
      setCommentData({ name: "", email: "", comment: "" }); 
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      {loading ? (
        <div className="text-center mt-8">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We're fetching the latest blog for you!
          </p>
        </div>
      ) : (
        <div className="bg-gray-100 py-8 px-6 lg:px-24">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <TfiThought className="text-4xl" />
            </Link>
            <div className="flex gap-4">
              {/* <button
                onClick={() => setShowLogin(true)}
                className="font-medium py-1 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-5px_5px_0px_#000000] transition-all hover:shadow-none rounded-[40px]"
              >
                Log In
              </button> */}
            </div>
          </div>
          <div className="text-center my-24">
            <h1 className="text-center text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
              {data.title}
            </h1>
            <div className="flex justify-center items-center gap-3">
              <Image
                className="rounded-full border border-gray-300 m-3"
                src={data.authorImg}
                width={50}
                height={50}
                alt={`${data.author}`}
              />
              <p className="text-lg text-gray-700">By: {data.author}</p>
            </div>
          </div>
          <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image
              className="border-4 border-white"
              src={data.image}
              width={1280}
              height={720}
              alt=""
            />

            <div
              className="blog-content mt-4"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>

            <Comments blogId={data._id} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Page;