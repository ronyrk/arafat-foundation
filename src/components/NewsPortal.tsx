import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchNews from './SearchNews'
import { NewsProps } from '@/types'
import moment from 'moment'

function NewsPortal({ newsList }: { newsList: NewsProps[] }) {
  return (
    <div className='p-4 bg-slate-200 rounded-md'>
      <div className="flex justify-center items-center">
        <SearchNews />
      </div>
      <h2 className=" text-lg border-b-2 py-2 border-color-main w-fit font-semibold text-color-main">সম্প্রতি সংবাদ</h2>
      <div className="py-2 grid grid-rows-1 gap-4 ">
        {
          newsList.map((item, index) => (
            <Link key={index} href={`/blog/${item.username}`}>
              <div className=" flex flex-row gap-2">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.photoUrl} width={100} height={80} alt={item.username} className=' w-70 h-70 rounded object-fill' />
                <div className="flex justify-around flex-col">
                  <h2 className=" text-base font-semibold text-color-main">{item.title}</h2>
                  <p className="text-sm font-normal">{`${moment(item.createAt).format('MMMM DD, YYYY')}`}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default NewsPortal