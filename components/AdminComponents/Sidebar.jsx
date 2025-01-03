"use client"
import React, { useState } from "react";
import { TfiThought } from "react-icons/tfi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { MdOutlineSubscriptions } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-toastify";
import { CiUnlock } from "react-icons/ci";


const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasscode = () => {
    const userPasscode = prompt("Enter the admin passcode:");
    if (userPasscode === process.env.NEXT_PUBLIC_ADMIN) {
      setIsAuthenticated(true);
    } else {
        toast.error('Incorrect code.');
    }
  };

  return (
    <div className="flex flex-col bg-slate-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <TfiThought className="text-4xl" />
      </div>
      <div className="w-20 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="w-[60%] sm:w-[90%] absolute right-0">
          {!isAuthenticated ? (
            
            <button
              onClick={handlePasscode}
              className="p-3 bg-gray-200 text-black rounded-lg cursor-pointer"
            >
                <CiUnlock />
            </button>
          ) : (
            <>
              <Link
                href="/admin/addBlog"
                className="flex items-center gap-3 p-3 pl-0 hover:bg-slate-200 rounded-lg cursor-pointer transition-all"
              >
                <IoIosAddCircleOutline className="text-xl text-gray-800" />
                <p className="hidden sm:block text-sm font-medium text-gray-800">
                  Add Blogs
                </p>
              </Link>
              <Link
                href="/admin/allBlogs"
                className="flex items-center gap-3 p-3 pl-0 hover:bg-slate-200 rounded-lg cursor-pointer transition-all"
              >
                <CiViewList className="text-xl text-gray-800" />
                <p className="hidden sm:block text-sm font-medium text-gray-800">
                  Blog List
                </p>
              </Link>
              <Link
                href="/admin/subscriptions"
                className="flex items-center gap-3 p-3 pl-0 hover:bg-slate-200 rounded-lg cursor-pointer transition-all"
              >
                <MdOutlineSubscriptions className="text-xl text-gray-800" />
                <p className="hidden sm:block text-sm font-medium text-gray-800">
                  Subscriptions
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;