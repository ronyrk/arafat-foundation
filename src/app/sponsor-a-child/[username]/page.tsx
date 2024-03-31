import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import DonationTable from '@/components/DonationTable';
import DisbursementTable from '@/components/DisbursementTable';
import { Share } from '@/components/Share';
import { ChildCarousel } from '@/components/ChildCarousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import ChildDonation from '@/components/ChildDonation';

function page({ params }: {
	params: {
		username: string
	}
}) {
	return (
		<div className='py-2 '>
			<div className='flex gap-x-3'>
				<div className="basis-3/12">
					<div className="relative h-fit flex flex-col border-2 rounded-md shadow-md ">
						<Image src="/hhjui.png" width={248} height={120} className='w-full h-[260px] object-fill rounded' alt="photo" />
						<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">স্কুল</p>
						<div className="w-full px-2 py-1 bg-white">
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
							<div className="p-2 flex justify-center">
								<Dialog>
									<DialogTrigger>
										<Button className=' w-full px-8 text-white rounded-sm bg-color-main hover:bg-color-sub'>
											স্পন্সর করুন
										</Button>
									</DialogTrigger>
									<DialogContent className='p-4'>
										<ChildDonation />
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</div>
				</div>
				<div className="basis-9/12 border-2 p-3 flex flex-col gap-y-4 rounded-md h-fit shadow-md">
					<h2 className=" text-xl text-color-main font-semibold">মোসাঃ মাহফুজা</h2>
					<p className=" text-base  leading-relaxed">ফাহিহা আক্তার তার মায়ের সাথে থাকেন। তার মা অন্যের বাড়িতে কাজ করেন। সে তার বাবাকে হারিয়েছে। তার পরিবারের জন্য তাদের চাহিদা মেটানো কঠিন। এমডি শেরাজুল ইসলাম সুনামগঞ্জ সদরে বেড়ে ওঠা। বিশুদ্ধ পানি, স্বাস্থ্যসেবা এবং পুষ্টিকর খাবারের সামর্থ্য না পাওয়ার কারণে ইসমাইলের পরিবার অপুষ্টির সম্মুখীন হয়। ইসমাইল পড়াশোনা করতে চেয়েছিলেন, কিন্তু তার পরিবারের আর্থিক সীমাবদ্ধতা তা অসম্ভব করে তোলে। জন্ম 1 জানুয়ারী 2009. সে একজন সার্ভিস হোল্ডার হওয়ার স্বপ্ন দেখে। লাল রঙের প্রতি তার অনুরাগ রয়েছে এবং তার অবসর সময় বই পড়তে, তার প্রিয় খাবারগুলি লেখা – ভাত এবং ডিম কাটাতে উপভোগ করেন। আপনার পৃষ্ঠপোষকতা একটি শিশুর ভবিষ্যত আলোকিত করছে। একটি সুবিধাবঞ্চিত শিশু তাদের স্বপ্ন উপলব্ধি করার সুযোগ দেওয়া হয়, আপনার সমর্থন ধন্যবাদ. তারা পুষ্টিকর খাবার, ভালো স্বাস্থ্যসেবা, শিক্ষা, উন্নত আবাসন এবং বিভিন্ন শিক্ষার সুযোগ পায়। একই সাথে, ভালবাসা এবং যত্ন লালন করা হয়। একটি প্রতিশ্রুতিশীল ভবিষ্যত আপনার উদারতার মাধ্যমে চাষ করা হয়। আমি প্রতি মাসে 1000 টাকায় কি পাব?
						মাসিক স্কুল ফি-450 টাকা
						মাসিক শিক্ষা উপকরণ – ৩০০ টাকা
						মাসিক স্কুল রক্ষণাবেক্ষণ – 250 টাকা

					</p>
					<div className="px-4 flex flex-col border-2 rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation</h2>
						<DonationTable />
					</div>
					<div className="px-4 flex flex-col border-2 rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation Disbursement</h2>
						<DisbursementTable />
					</div>
				</div>
			</div>
			<div className="py-4 px-2">
				<Share type='share' username='1' />
			</div>
			<ChildCarousel />
		</div>
	)
}

export default page