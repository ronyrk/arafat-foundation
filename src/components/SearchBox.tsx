"use client";
import React from 'react'
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce"

function SearchBox() {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("search", term);
		} else {
			params.delete("search");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);
	const search = searchParams.get('search');
	return (
		<div className="px-4 py-2 flex justify-end">
			<Input className='w-64' onChange={(e) => {
				handleSearch(e.target.value);
			}}
				defaultValue={searchParams.get("search")?.toString()}
				type="text" placeholder="Search" />
		</div>
	)
}

export default SearchBox