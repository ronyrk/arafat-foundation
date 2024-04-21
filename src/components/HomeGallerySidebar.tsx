"use client";
import { CategoryIProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'


function HomeGallerySidebar() {
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
		replace(`${pathname}?${params.toString()}#gallery`);
	}
	const type = searchParams.get('type');
	return (
		<div className='flex flex-row justify-center gap-2 rounded'>
			{
				isLoading ? <h2>Loading...</h2> : <>
					{
						data?.map((item, index) => (

							<button key={index} onClick={() => {
								handleSearch(item?.path);
							}} className={`py-1 px-2 text-[15px] font-semibold border-b-4 ${type === item.path ? "text-color-sub  border-color-sub" : "hover:border-color-sub hover:text-color-sub  border-white "}`}>{item.name}</button>
						))
					}
				</>
			}
		</div>
	)
}

export default HomeGallerySidebar