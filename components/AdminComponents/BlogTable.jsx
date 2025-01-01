import Image from 'next/image';
import React from 'react'
import defaultImg from '@/assets/flat-alien.png'
import { IoMdClose } from "react-icons/io";


const BlogTableItem = ({authorImg,title,author,date,deleteBlog,mongoId})=> {

    const BlogDate = new Date(date);

    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image width={40} height={40} src={authorImg ? authorImg:defaultImg} alt='' />
                <p>{author ? author:'No Author'}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title:'No Title'}
            </td>
            <td className='px-6 py-4'>
                {BlogDate.toDateString()}
            </td>
            <td onClick={()=> deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
                <IoMdClose />
            </td>
        </tr>
    )
}

export default BlogTableItem;