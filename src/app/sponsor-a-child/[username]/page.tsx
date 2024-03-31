import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'

function page({ params }: {
	params: {
		username: string
	}
}) {
	return (
		<div className='flex py-2 '>
			<div className="basis-3/12 border-2 p-2 rounded-md">
				<div className="relative flex flex-col border-2 rounded-md shadow-md ">
					<Image src="/hhjui.png" width={248} height={120} className='w-full h-[260px] object-fill rounded' alt="photo" />
					<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">স্কুল</p>
					<div className="w-full px-1 bg-white">
						<h2 className="py-2 text-xl font-semibold text-color-main hover:text-color-sub">মোসাঃ মাহফুজা</h2>
						<div className="flex flex-row py-1">
							<h2 className="text-[15px] font-medium">স্বপ্ন :</h2>
							<h2 className="text-[15px] pl-6 font-medium">বিসিএস ক্যাডার</h2>
						</div>
						<div className="flex flex-row py-1">
							<h2 className="text-[15px]  font-medium">ফোন :</h2>
							<h2 className="text-[15px] pl-4 font-medium">01738123456</h2>
						</div>
						<div className="flex flex-row py-1">
							<h2 className="text-[15px]  inline  font-medium">ঠিকানা:</h2>
							<h2 className="text-[15px] pl-2 font-medium">টাংগন-পশ্চিম পাড়া, ইউসুফপুর,চারঘাট, রাজশাহী</h2>
						</div>
						<div className="p-2">
							<Button className=' w-full px-4 text-white rounded-sm bg-color-main hover:bg-color-sub' asChild>
								<Link href="#">স্পন্সর করুন</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="basis-9/12">
				<h2 className="">Hello</h2>
			</div>
		</div>
	)
}

export default page