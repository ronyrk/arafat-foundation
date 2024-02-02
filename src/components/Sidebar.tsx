"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname();
	return (
		<div className='flex flex-col bg-gray-100 border-2 rounded'>
			<Link className={` px-4 py-3 text-base font-semibold rounded-md hover:bg-gray-200 hover:text-black ${pathname === "/karze-hasana" ? "bg-black text-white" : " text-black"}`} href="/">About Us</Link>
			<Link className={` px-4 py-3 text-base font-semibold rounded-md hover:bg-gray-200 hover:text-black ${pathname === "/karze-hasana/branch" ? "bg-black text-white" : " text-black"}`} href="/karze-hasana/branches">Our Branches</Link>
			<Link className={` px-4 py-3 text-base font-semibold rounded-md hover:bg-gray-200 hover:text-black ${pathname === "/karze-hasana/donors" ? "bg-black text-white" : " text-black"}`} href="/karze-hasana/donors">Donors & Leader</Link>
			<Link className={` px-4 py-3 text-base font-semibold rounded-md hover:bg-gray-200 hover:text-black ${pathname === "/karze-hasana/borrowers" ? "bg-black text-white" : " text-black"}`} href="/karze-hasana/borrowers">Borrowers</Link>
		</div>
	)
}

export default Sidebar

