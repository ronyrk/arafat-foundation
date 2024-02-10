import { ParamsIProps } from '@/types'
import Image from 'next/image';
import React from 'react'

function page({ params }: ParamsIProps) {
	const { username } = params;
	return (
		<div className=' bg-slate-50 md:px-20 px-4 py-4 md:py-14'>
			<div className="flex md:flex-row flex-col md:gap-4 gap-2 items-center">
				<div className="md:basis-1/4 w-fit">
					<Image src="/Arafat-foundation-footer-logo.png" width={250} height={180} alt='profile' />
				</div>
				<div className=" border-2 md:basis-3/4 w-full flex md:flex-row flex-col rounded-md p-2 bg-white ">
					<div className=" border-r-2 basis-1/2 flex flex-col justify-around">
						<h1 className="font-normal">ব্রাঞ্চের নাম:- <span className=" text-color-main font-semibold">কুড়িগ্রাম জামে মসজিদ</span></h1>
						<h2 className="font-normal">গ্রামের নাম:- <span className=" text-color-main font-semibold">কুড়িগ্রাম সদর</span></h2>
						<h2 className="font-normal">ডাকঘর:- <span className=" text-color-main font-semibold">কুড়িগ্রাম সদর</span></h2>
						<h2 className="font-normal">ডাকঘর কোড :- <span className=" text-color-main font-semibold">5670</span></h2>
						<h2 className="font-normal">থানা:- <span className=" text-color-main font-semibold">কুড়িগ্রাম</span></h2>
						<h2 className="font-normal">জেলা:- <span className=" text-color-main font-semibold">কুড়িগ্রাম</span></h2>
					</div>
					<div className="md:basis-1/2 w-full p-2">
						<h2 className=" font-semibold text-color-main text-center border-b-2 pb-1">মসজিদের সভাপতি তথ্য</h2>
						<div className='flex md:flex-row flex-col justify-around gap-1'>
							<div className=" md:basis-1/2 w-full flex flex-col justify-around md:py-[1px] py-2">
								<h2 className="font-normal">নাম:- <span className=" text-color-main font-semibold">মো: রাকিবুল হাসান</span></h2>
								<h2 className="font-normal">বাবার নাম:- <span className=" text-color-main font-semibold">মোঃ মানিক মিয়া</span></h2>
								<h2 className="font-normal">মাতার নাম:- <span className=" text-color-main font-semibold">মোছা: বানেছা বেগম</span></h2>
								<h2 className="font-normal">স্থায়ী ঠিকানা:- <span className=" text-color-main font-semibold"> কুড়িগ্রাম সদর</span></h2>
								<h2 className="font-normal">পেশা:- <span className=" text-color-main font-semibold">কম্পিউটার ইঞ্জিনিয়ার</span></h2>
								<h2 className="font-normal">মোবাইল নম্বর:- <span className=" text-color-main font-semibold">01793874052</span></h2>
							</div>
							<div className="md:basis-1/2 w-full flex  md:justify-end justify-center items-center">
								<Image alt='ceo photo' src="/arafat-logo.png" width={100} height={80} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page