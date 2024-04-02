import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { ChildIProps, ProjectsProps } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ChildDonation from '@/components/ChildDonation';

async function Child() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/child');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ChildIProps[] = await res.json();
	return (
		<div className="grid grid-cols-2 gap-1 p-2 md:grid-cols-4 justify-stretch md:gap-3">
			{
				data.map((item, index) => (
					<div key={index} className="relative flex flex-col border-2 rounded-md shadow-md ">
						<Image src={item.photoUrl} width={248} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='w-full h-[260px] object-fill rounded' alt={item.username} />
						<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">স্কুল</p>
						<div className="w-full px-1 bg-white">
							<h2 className="py-2 text-xl font-semibold text-color-main hover:text-color-sub">{item.name}</h2>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px] font-medium">স্বপ্ন :</h2>
								<h2 className="text-[15px] pl-6 font-medium">{item.dream}</h2>
							</div>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px]  font-medium">ফোন :</h2>
								<h2 className="text-[15px] pl-4 font-medium">{item.phone}</h2>
							</div>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px]  inline  font-medium">ঠিকানা:</h2>
								<h2 className="text-[15px] pl-2 font-medium">{item.address}</h2>
							</div>
							<div className="flex justify-around py-2 md:flex-row">
								<Button className='w-[130px] px-4 text-white rounded-sm bg-color-sub hover:bg-color-main' asChild>
									<Link href={`our-projects/${item.username}`}>প্রোফাইল দেখুন</Link>
								</Button>
								<Dialog>
									<DialogTrigger>
										<Button className='w-[130px] px-4 text-white rounded-sm bg-color-main hover:bg-color-sub'>
											স্পন্সর করুন
										</Button>
									</DialogTrigger>
									<DialogContent className='p-4'>
										<ChildDonation item={item} />
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</div>
				))
			}
		</div>
	)
}

function ChildList() {
	return (
		<div className='py-2'>
			<h1 className="py-2 text-4xl font-semibold text-center text-color-main">একটি শিশুর দায়িত্ব নিন</h1>
			<h2 className="py-2 text-base font-medium text-center text-color-main">একটি শিশুর (আংশিক অথবা পূর্ণ) দায়িত্ব নেওয়ার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে সে ঝরে পড়ার ঝুঁকি ছাড়াই শিক্ষা লাভ করতে পারে।</h2>
			<h2 className="py-2 text-base font-semibold text-center text-color-main">ইসলামের দৃষ্টিতে এতিমের লালন-পালনের দায়িত্ব নেয়া জান্নাতে যাওয়ার মাধ্যম। </h2>
			<h2 className="py-2 text-base font-normal text-center text-color-main">আল্লাহর রাসূল (ﷺ) বলেছেন, ‘যে ব্যক্তি কোনো এতিমকে আপন মাতা-পিতার সঙ্গে নিজেদের (পারিবারিক) খাবারের আয়োজনে বসায় এবং <br /> (তাকে এই পরিমাণ আহার্য দান করে যে) সে পরিতৃপ্ত হয়ে আহার করে, তাহলে তার জন্য জান্নাত ওয়াজিব হয়ে যাবে।’ <br /> (মুসনাদে আহমাদ : ১৮২৫২)</h2>
			<h2 className="py-2 text-base font-semibold text-center text-color-main">এতিমের অভিভাবক জান্নাতে নবীজির কাছাকাছি থাকবে </h2>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<h1 className="py-2 text-sm font-normal text-center border-dotted text-color-main">আল্লাহর রাসূল (ﷺ) বলেছেন, ‘আমি ও এতিমের অভিভাবক জান্নাতে দুই আঙুলের ন্যায় অতি কাছাকাছি থাকব।’ (বুখারি : ৬০০৫)</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Child />
			</Suspense>
		</div >
	)
}

export default ChildList