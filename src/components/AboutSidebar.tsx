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
		name: "পরিচিতি",
		path: "/about-us"
	},
	{
		name: "নীতি ও আদর্শ",
		path: "principles-and-ideals"
	},
	{
		name: "লক্ষ্য ও উদ্দেশ্য",
		path: "aims-and-objectives"
	},
	{
		name: "তহবিল ও আয়ের এর উৎস",
		path: "funds-and-income"
	},
	{
		name: "ব্যয়ের নীতিমালা",
		path: "expenditure-policy"
	},
	{
		name: "অর্জনসমূহ",
		path: "achievements"
	}

]

function ABoutSidebar() {
	const pathname = usePathname();
	const routes = pathname.split('/');
	const subRoutes = routes.at(2);

	return (
		<div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
			{
				data.map((item, index) => (
					<Link key={index} className={` pl-4 py-3 text-[15px] font-semibold rounded-md ${subRoutes === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href={item.path}>{item.name}</Link>
				))
			}
		</div>
	)
}

export default ABoutSidebar

