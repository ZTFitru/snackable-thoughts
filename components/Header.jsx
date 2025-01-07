import React, { useState } from "react";
import { TfiThought } from "react-icons/tfi";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Header = ({setShowLogin}) => {
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <header className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <TfiThought className="text-4xl" />
        </Link>
        {/* <div className="flex gap-4">
          <button onClick={()=> setShowLogin(true)} className="font-medium py-1 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-5px_5px_0px_#000000] transition-all hover:shadow-none rounded-[40px]">
            Log In
          </button>
        </div> */}
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium mt-20">
          Snackable Thoughts
        </h1>
        <p className="text-sm sm:text-xl font-thin mt-3">
          Writings from our team
        </p>
        <div className="flex flex-col items-center justify-center light mt-10">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <form onSubmit={onSubmitHandler} className="flex flex-col">
              <input
                type="email"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-label="Email Address"
                required
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
