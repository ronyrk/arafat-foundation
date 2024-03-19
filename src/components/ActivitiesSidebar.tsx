"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

interface NavbarIProps {
	name: string,
	path: string,
}

const data: NavbarIProps[] = [
	{
		name: "স্বাবলম্বীকরণ প্রকল্প",
		path: "/our-activities",
	},
	{
		name: "নীতি ও আদর্শ",
		path: "/about-us/Nurturing and teaching"
	},
	{
		name: "লক্ষ্য ও উদ্দেশ্য",
		path: "/about-us/aims-and-objectives"
	},
	{
		name: "তহবিল ও আয়ের এর উৎস",
		path: "/about-us/funds-and-income"
	},
	{
		name: "ব্যয়ের নীতিমালা",
		path: "/about-us/expenditure-policy"
	},
	{
		name: "অর্জনসমূহ",
		path: "/about-us/achievements"
	}

]

function ActivitiesSidebar() {
	const pathname = usePathname();
	return (
		<div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
			{
				data.map((item, index) => (
					<Link key={index} className={` pl-4 py-3 text-[15px] font-semibold rounded-md ${pathname === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href={item.path}>{item.name}</Link>
				))
			}
		</div>
	)
}

export default ActivitiesSidebar;

