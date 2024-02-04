import Image from 'next/image'
import React from 'react';
import logo from '../../public/karze-hasana.png';
import Marquee from "react-fast-marquee";

function HeaderSlider() {
	return (
		<div className='md:px-20 px-4 h-100 flex justify-start bg-color-main py-2 gap-2 items-center'>

			<Image src={logo} className='mr-4 border-dashed rounded border-white pr-4 border-r-2' height={80} width={120} alt='logo' placeholder='blur' />
			<div className="">
				<Marquee className='md:py-4 px-4 py-2  text-xl text-white'>
					কর্জে হাসানা; সুদ যেখানে হার মানতে বাধ্য (দরিদ্র এবং সুবিধা বঞ্চিতদের জন্য 100% সুদ-মুক্ত ঋণ ♦ কোন সুদ নেই ♦ কোন প্রসেসিং ফি নেই ♦ কোন গোপন চার্জ নেই ♦ কোন সার্ভিস চার্জ নেই ♦ কোন আবেদন ফি নেই♦ কোন লাভ নেই।)
				</Marquee>
			</div>
		</div>
	)
}

export default HeaderSlider