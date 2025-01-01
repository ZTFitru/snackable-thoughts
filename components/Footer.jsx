import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SlSocialYoutube } from "react-icons/sl";
import { FaRegCopyright } from "react-icons/fa";


const Footer = () => {
    return (
      <div className="flex flex-col items-center gap-4 bg-black py-4 px-4 sm:flex-row sm:justify-between">
        <div className="flex gap-5 mx-8 text-sm">
          <FaInstagram className="text-white text-lg gap-3" />
          <BsTwitterX className="text-white text-lg gap-3" />
          <SlSocialYoutube className="text-white text-lg gap-3" />
        </div>
        <div className="flex items-center gap-1 mr-5 text-xs text-white sm:text-sm">
          <p>
            All rights reserved. <FaRegCopyright className="inline-block" /> Snackable Thoughts
          </p>
        </div>
      </div>
    );
  };
  
  export default Footer;
