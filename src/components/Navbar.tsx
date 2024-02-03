import React from 'react'
import { Linkedin, Mail, PhoneCall } from 'lucide-react';

function Navbar() {
	return (
		<>
			<div className='px-20 flex justify-between bg-color-main py-2'>
				<div className=" flex flex-row gap-2 items-center">
					<PhoneCall className='text-orange-400 hover:text-orange-500 font-bold cursor-pointer' size={13} />
					<span className='text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2'>01602505070</span>
					<Mail className='text-orange-400 hover:text-orange-500 font-bold cursor-pointer' size={13} />
					<span className='text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2'>contact@arafatfoundation.org</span>
				</div>
				<div className="flex flex-row items-center gap-2">
					<a href="/" className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
					<a href="/" className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></a>
					<a href="/" className="text-white rounded px-[2px]"><Linkedin className='text-white  hover:text-orange-500 cursor-pointer' size={18} /></a>
				</div>
			</div>
		</>
	)
}

export default Navbar