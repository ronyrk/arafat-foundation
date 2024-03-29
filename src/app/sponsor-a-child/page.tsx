import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { ProjectsProps } from '@/types';

async function Child() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/project');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ProjectsProps[] = await res.json();
	return (
		<div className="grid md:grid-cols-3 grid-cols-1 justify-stretch md:gap-3 gap-1 p-2">
			{
				data.map((item, index) => (
					<div key={index} className=" flex  border-2 shadow-md  justify-around flex-col">
						<Image src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
						<div className="w-full bg-white  justify-stretch px-2">
							<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-2">{item.title}</h2>
							<p className=" text-[15px] font-medium">{item.shortDes}</p>
							<div className="flex md:flex-row  justify-between py-2">
								<Button className=' hover:bg-color-sub' asChild>
									<Link href={`our-projects/${item.username}`}>বিস্তারিত দেখুন</Link>
								</Button>
								<Button variant={"outline"} className=' text-color-main border-color-main border-2 hover:text-white hover:border-color-sub' asChild>
									<Link href="#">দান করুন</Link>
								</Button>
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
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">একটি শিশুর দায়িত্ব নিন</h1>
			<h2 className="text-center text-base  text-color-main font-medium py-2">একটি শিশুর (আংশিক অথবা পূর্ণ) দায়িত্ব নেওয়ার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে সে ঝরে পড়ার ঝুঁকি ছাড়াই শিক্ষা লাভ করতে পারে।</h2>
			<h2 className="text-center text-base  text-color-main  font-semibold py-2">ইসলামের দৃষ্টিতে এতিমের লালন-পালনের দায়িত্ব নেয়া জান্নাতে যাওয়ার মাধ্যম। </h2>
			<h2 className="text-center text-base  text-color-main font-normal py-2">আল্লাহর রাসূল (ﷺ) বলেছেন, ‘যে ব্যক্তি কোনো এতিমকে আপন মাতা-পিতার সঙ্গে নিজেদের (পারিবারিক) খাবারের আয়োজনে বসায় এবং <br /> (তাকে এই পরিমাণ আহার্য দান করে যে) সে পরিতৃপ্ত হয়ে আহার করে, তাহলে তার জন্য জান্নাত ওয়াজিব হয়ে যাবে।’ <br /> (মুসনাদে আহমাদ : ১৮২৫২)</h2>
			<h2 className="text-center text-base  text-color-main  font-semibold py-2">এতিমের অভিভাবক জান্নাতে নবীজির কাছাকাছি থাকবে </h2>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-sm  text-color-main font-normal border-dotted py-2">আল্লাহর রাসূল (ﷺ) বলেছেন, ‘আমি ও এতিমের অভিভাবক জান্নাতে দুই আঙুলের ন্যায় অতি কাছাকাছি থাকব।’ (বুখারি : ৬০০৫)</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Child />
			</Suspense>
		</div >
	)
}

export default ChildList