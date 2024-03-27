import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchNews from './SearchNews'

function NewsPortal() {
  return (
    <div className='p-4 bg-slate-200 rounded-md'>
      <div className="flex justify-center items-center">
        <SearchNews />
      </div>
      <h2 className=" text-lg border-b-2 py-2 border-color-main w-fit font-semibold text-color-main">সম্প্রতি সংবাদ</h2>
      <div className="py-2 grid grid-rows-1 gap-4 ">
        <Link href={`/news/username`}>
          <div className=" flex flex-row gap-2">
            <Image src="/test.jpg" width={70} height={70} alt='image' className=' w-70 h-70 rounded object-fill' />
            <div className="flex justify-around flex-col">
              <h2 className=" text-base font-semibold text-color-main">অসহায় পরিবারের মাঝে চাল বিতরণ</h2>
              <p className="text-sm font-normal">December 15, 2023</p>
            </div>
          </div>
        </Link>
        <div className=" flex flex-row gap-2">
          <Image src="/test.jpg" width={70} height={70} alt='image' className=' w-70 h-70 rounded object-fill' />
          <div className="flex justify-around flex-col">
            <h2 className=" text-base font-semibold text-color-main">অসহায় পরিবারের মাঝে চাল বিতরণ</h2>
            <p className="text-sm font-normal">December 15, 2023</p>
          </div>
        </div>
        <div className=" flex flex-row gap-2">
          <Image src="/test.jpg" width={70} height={70} alt='image' className=' w-70 h-70 rounded object-fill' />
          <div className="flex justify-around flex-col">
            <h2 className=" text-base font-semibold text-color-main">অসহায় পরিবারের মাঝে চাল বিতরণ</h2>
            <p className="text-sm font-normal">December 15, 2023</p>
          </div>
        </div>
        <div className=" flex flex-row gap-2">
          <Image src="/test.jpg" width={70} height={70} alt='image' className=' w-70 h-70 rounded object-fill' />
          <div className="flex justify-around flex-col">
            <h2 className=" text-base font-semibold text-color-main">অসহায় পরিবারের মাঝে চাল বিতরণ</h2>
            <p className="text-sm font-normal">December 15, 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPortal