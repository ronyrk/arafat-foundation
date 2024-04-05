"use client";
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';



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
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("type", term);
		} else {
			params.delete("type");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 100);
	const type = searchParams.get('type');
	console.log(type, "con");
	return (
		<div className='flex md:flex-col flex-row flex-wrap bg-[#F1F1FA] border-2 rounded gap-2'>
			{
				data.map((item, index) => (

					<button key={index} onClick={() => {
						handleSearch(item.path);
					}} className={`py-1 px-2 text-[15px] font-semibold rounded-md ${type === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`}>{item.name}</button>
				))
			}
		</div>
	)
}

export default GallerySidebar