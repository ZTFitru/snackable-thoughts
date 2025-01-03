'use client'
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginPopUp from "@/components/LoginPopUp";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";

export default function Home() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
      <ToastContainer theme="dark" />
      <Header setShowLogin={setShowLogin} />
      <Blogs />
      <Footer />
    </>
  );
}
