"use client";
import { CategoryIProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'


function GallerySidebar() {
	const { data, isLoading } = useQuery<CategoryIProps[]>({
		queryKey: ["category"],
		queryFn: async () => {
			const response = await axios.get('/api/category');
			return response.data;
		},
		refetchInterval: 10000,
	});

	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const handleSearch = (term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("type", term);
		} else {
			params.delete("type");
		}
		replace(`${pathname}?${params.toString()}`);
	}
	const type = searchParams.get('type');
	return (
		<div className='flex md:flex-col flex-row flex-wrap bg-[#F1F1FA] border-2 rounded gap-2'>
			{
				isLoading ? <h2>Loading...</h2> : <>
					<button onClick={() => {
						handleSearch("all");
					}} className={`py-2 px-2 text-[15px] font-semibold rounded-md ${type === "all" ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`}>সকল</button>
					{
						data?.map((item, index) => (

							<button key={index} onClick={() => {
								handleSearch(item?.path);
							}} className={`py-2 px-2 text-[15px] font-semibold rounded-md ${type === item.path ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`}>{item.name}</button>
						))
					}
					<button onClick={() => {
						handleSearch("video");
					}} className={`py-2 px-2 text-[15px] font-semibold rounded-md ${type === "video" ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`}>ভিডিও</button>
				</>
			}
		</div>
	)
}

export default GallerySidebar