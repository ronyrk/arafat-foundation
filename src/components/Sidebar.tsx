"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import SidebarButton from './sidebar-button';
import { DonorIProps } from '@/types';

function Sidebar({ donors }: { donors: DonorIProps[] }) {
	const pathname = usePathname();
	const routes = pathname.split('/');
	const subRoutes = routes.at(2);
	return (
		<div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
			<Link prefetch={false} className={` pl-4 py-3 text-[15px] font-semibold rounded-md ${pathname === "/karze-hasana" ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href="/karze-hasana">About Us</Link>
			<Link prefetch={false} className={` px-4 py-3 text-[15px]  font-semibold rounded-md ${subRoutes === "branches" ? " bg-color-main text-white" : " hover:bg-[#DDDCF0] hover:text-black text-black"}`} href="/karze-hasana/branches">Our Branches</Link>
			<Link prefetch={false} className={` px-4 py-3 text-[15px]  font-semibold rounded-md  ${subRoutes === "donor-and-lenders" ? " bg-color-main text-white" : "hover:bg-[#DDDCF0] hover:text-black text-black"}`} href="/karze-hasana/donor-and-lenders">Donor & Lenders</Link>
			<Link prefetch={false} className={` px-4 py-3 text-base font-semibold rounded-md ${subRoutes === "borrowers" ? " bg-color-main text-white" : " hover:bg-[#DDDCF0] hover:text-black text-black"}`} href="/karze-hasana/borrowers">Borrowers</Link>
			<SidebarButton donors={donors} />
		</div>
	)
}

export default Sidebar

