import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ image, category, title, id }) => {

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-auto object-cover"
        />
      </Link>
      <p className="ml-4 mt-4 inline-block bg-gray-800 text-white text-xs font-semibold py-1 px-3 rounded-full">
        {category}
      </p>
      <div className="p-4">
        <h2 className="mb-2 text-lg font-bold text-gray-800 line-clamp-2 hover:text-gray-600 transition-colors">
          {title}
        </h2>
        <Link
          href={`/blogs/${id}`}
          className="inline-block mt-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
