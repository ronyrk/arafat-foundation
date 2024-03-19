"use client";
import React from 'react'
import { AlignJustify, HandHeart, Linkedin, Mail, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../public/arafat-logo.png';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';



function Navbar() {
	const pathname = usePathname();
	return (
		<div>
			<div id='top' className='md:px-20 px-4 flex justify-between bg-color-main py-2  items-center'>
				<div className=" flex flex-row gap-2 md:px-12 md:ml-[-38px] px-2 items-center">
					<a className='flex flex-row items-center gap-2' href="tel:01602505070">
						<PhoneCall className='text-orange-400 hover:text-orange-500 font-bold cursor-pointer' size={13} />

						<span className='text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2'>01602505070</span>
					</a>
					<a className='flex flex-row items-center gap-2' href="mailto:contact@arafatfoundation.org">
						<Mail className='text-orange-400 hover:text-orange-500 font-bold cursor-pointer' size={13} />
						<span className='text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2'>contact@arafatfoundation.org</span>
					</a>
				</div>
				<div className=" hidden md:flex flex-row items-center gap-2">
					<a href="/" className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
					<a href="/" className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></a>
					<a href="/" className="text-white rounded px-[2px]"><Linkedin className='text-white  hover:text-orange-500 cursor-pointer' size={18} /></a>
				</div>
			</div>
			<div className="md:px-20 px-4 flex flex-row justify-between  bg-[#FFFFFF] gap-2 md:gap-0 items-center">
				<Link href="/">
					<Image className='w-[120px] h-[100] py-2 object-contain rounded' src={Logo} placeholder='blur' alt='logo' />
				</Link>
				<div className=' hidden md:flex'>
					<Link href='/' className={`text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub hover:border-b-4 ${pathname === "/" ? "border-b-4 border-color-sub text-color-sub" : ""}`}>
						হোম
					</Link>
					<Link href='/about-us' className='text-[16px] py-10 mx-3 font-semibold  hover:border-color-sub hover:border-b-4 hover:text-color-sub'>
						আমাদের সম্পর্কে
					</Link>
					<Link href='/our-activities' className='text-[16px] py-10 mx-3 font-semibold  hover:border-color-sub hover:border-b-4 hover:text-color-sub'>
						আমাদের কার্যক্রম
					</Link>
					<Link href='https://arafatfoundation.org/donation-verify/' className='text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub hover:border-b-4' >
						DONATION VERIFY
					</Link>
					<Link href='/karze-hasana' className={`text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub hover:border-b-4 ${pathname === "/karze-hasana" || pathname === "/karze-hasana/branches" || pathname === "/karze-hasana/" || pathname === "/karze-hasana/donor-and-lenders" || pathname === "/karze-hasana/borrowers" ? "border-b-4 border-color-sub text-color-sub" : ""}`}>
						কর্জে হাসানা
					</Link>
					<Link href='/contact-us' className='text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub hover:border-b-4'>
						যোগাযোগ
					</Link>
				</div>
				<div>
					<Button asChild className=' w-28 bg-color-main hover:bg-color-sub' size={"lg"}><Link href="https://arafatfoundation.org/donate/">দান করুন <span className='ml-[6px]'><HandHeart /></span></Link></Button>
				</div>
				<div className="md:hidden flex">
					<Sheet>
						<SheetTrigger><AlignJustify className='mr-4' size={30} /></SheetTrigger>
						<SheetContent side={"left"}>
							<div className="flex flex-col gap-2">
								<Link className='py-2 border-b-2 px-2' href="https://arafatfoundation.org/">হোম</Link>
								<Link className='py-2 border-b-2 px-2' href="/about-us">আমাদের সম্পর্কে</Link>
								<Link className='py-2 border-b-2 px-2' href="/our-activities">আমাদের কার্যক্রম</Link>
								<Link className='py-2 border-b-2 px-2' href="https://arafatfoundation.org/donation-verify/">DONATION VERIFY</Link>
								<Link className='py-2 border-b-2 px-2' href="/karze-hasana">কর্জে হাসানা</Link>
								<Link className='py-2 border-b-2 px-2' href="/contact-us">যোগাযোগ</Link>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	)
}

export default Navbar