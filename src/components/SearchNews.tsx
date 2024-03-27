"use client";
import React from 'react'
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce"

function SearchNews() {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("news", term);
		} else {
			params.delete("news");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);
	const search = searchParams.get('news');
	return (
		<div className="px-4 pb-3 flex justify-end">
			<div className="flex flex-col">
				<Input className='w-80 bg-white' id='news' onChange={(e) => {
					handleSearch(e.target.value);
				}}
					defaultValue={searchParams.get("news")?.toString()}
					type="text" placeholder="Search for posts" />
			</div>
		</div>
	)
}

export default SearchNews