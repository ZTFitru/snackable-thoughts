import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import axios from 'axios';

const Blogs = () => {
  
    const [menu, setMenu]= useState("All");
    const [blogs, setBlogs]= useState([])

    const fetchBlogs = async ()=> {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs)
    }

    useEffect(()=> {
        fetchBlogs();
    }, [])

    return (
        <div>
          <div className="flex justify-center overflow-x-auto gap-2 my-10 px-2 sm:px-10 scrollbar-hide">
            {["All", "Tech", "Sports", "Entertainment", "Education"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setMenu(category)}
                  className={`py-2 px-2 whitespace-nowrap text-sm rounded-md transition-all ${
                    menu === category
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
          <div className="grid grid-cols-1 ml-5 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:mx-24">
            {blogs
              .filter((item) => (menu === "All" ? true : item.category === menu))
              .map((item, index) => (
                <BlogCard
                  key={index}
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                />
              ))}
          </div>
        </div>
      );
}

export default Blogs
