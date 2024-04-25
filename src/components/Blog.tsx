import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { NewsProps } from '@/types';
import BlogCarousel from './BlogCarousel';


async function Blog() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/news');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: NewsProps[] = await res.json();
	return (
		<div className='py-2 md:px-20 md:py-4 bg-[#FCFCFD]'>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">ব্লগ</h1>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<BlogCarousel data={data} />
			</Suspense>
			<div className="flex justify-center py-4">
				<Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
					<Link href="/blog">আরো দেখুন</Link>
				</Button>
			</div>
		</div >
	)
}

export default Blog