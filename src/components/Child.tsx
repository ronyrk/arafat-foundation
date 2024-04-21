import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { ChildIProps } from '@/types';

async function Childs() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/child');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ChildIProps[] = await res.json();
	return (
		<div className="grid grid-cols-1 gap-1 p-2 px-2 md:grid-cols-4 justify-stretch md:gap-3">
			{
				data.slice(0, 4).map((item, index) => (
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
							<div className="flex flex-col justify-around gap-2 py-1 md:py-2 md:flex-row">
								<Button className='md:w-[130px] md:px-4 px-1 text-white rounded-sm bg-color-sub hover:bg-color-main' asChild>
									<Link href={`sponsor-a-child/${item.username}`}>প্রোফাইল দেখুন</Link>
								</Button>
								<Button className='md:w-[130px] md:px-4 px-1 text-white rounded-sm bg-color-main hover:bg-color-sub' asChild>
									<Link href={`/donation/${item.username}`}>স্পন্সর করুন</Link>
								</Button>
							</div>
						</div>
					</div>
				))
			}
		</div>
	)
}

function Child() {
	return (
		<div className='py-2 md:px-20 md:py-4 bg-[#FCFCFD]'>
			<h1 className="py-2 text-4xl font-semibold text-center text-color-main">একটি শিশুর দায়িত্ব নিন</h1>
			<h2 className="py-2 text-base font-medium text-center text-color-main">একটি শিশুর (আংশিক অথবা পূর্ণ) দায়িত্ব নেওয়ার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে সে ঝরে পড়ার ঝুঁকি ছাড়াই শিক্ষা লাভ করতে পারে।</h2>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<h1 className="py-2 text-sm font-normal text-center border-dotted text-color-main">আমাদের শিশু স্পনসরশিপ প্রোগ্রামে আপনি একটি শিশুর জন্য সহায়তা প্রদান করতে পারেন।</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Childs />
			</Suspense>
			<div className="flex justify-center py-4">
				<Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
					<Link href="/sponsor-a-child">আরো দেখুন</Link>
				</Button>
			</div>
		</div >
	)
}

export default Child