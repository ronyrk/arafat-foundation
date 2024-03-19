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
		name: "এতিমদের লালন-পালন ও শিক্ষাদান",
		path: "/our-activities/nurturing-and-teaching"
	},
	{
		name: "লক্ষ্য ও উদ্দেশ্য",
		path: "/our-activities/aims-and-objectives"
	},
	{
		name: "তহবিল ও আয়ের এর উৎস",
		path: "/our-activities/funds-and-income"
	},
	{
		name: "ব্যয়ের নীতিমালা",
		path: "/our-activities/expenditure-policy"
	},
	{
		name: "অর্জনসমূহ",
		path: "/our-activities/achievements"
	}

]

function ActivitiesSidebar() {
	const pathname = usePathname();
	return (
		<div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
			{
				data.map((item, index) => (
					<Link key={index} className={` pl-2 py-3 text-[15px] font-semibold rounded-md ${pathname === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href={item.path}>{item.name}</Link>
				))
			}
		</div>
	)
}

export default ActivitiesSidebar;

