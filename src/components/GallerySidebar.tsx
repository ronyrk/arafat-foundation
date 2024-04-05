"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'



interface NavbarIProps {
	name: string,
	path: string,
}

const data: NavbarIProps[] = [
	{
		name: "সকল",
		path: "all",
	},
	{
		name: "রমজান প্রোজেক্ট",
		path: "romajan"
	},
	{
		name: "ত্রাণ বিতরণ",
		path: "relief-distribution"
	},
	{
		name: "শীতবস্ত্র",
		path: "winter"
	},
	{
		name: "অন্নান্য",
		path: "others"
	},
	{
		name: "ভিডিও",
		path: "video"
	}

]
function GallerySidebar() {
	const pathname = usePathname();
	return (
		<div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
			{
				data.map((item, index) => (

					<button key={index} onClick={() => {
						console.log(`${item.path}`)
					}} className={` pl-2 py-3 text-[15px] font-semibold rounded-md ${pathname === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`}>{item.name}</button>
				))
			}
		</div>
	)
}

export default GallerySidebar