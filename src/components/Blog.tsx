import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { NewsProps, ProjectsProps } from '@/types';
import moment from 'moment';


async function BlogsList() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/news');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: NewsProps[] = await res.json();
	return (
		<div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-3 justify-stretch md:gap-3">
			{
				data.map((item, index) => (
					<Link key={index} href={`blog/${item.username}`}>
						<div className="flex flex-col border-2 rounded-md shadow-xl ">
							<Image src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
							<div className="justify-around w-full px-2 py-2 bg-white border-t-2">
								<h3 className="py-2 text-sm font-medium text-color-main hover:text-color-sub">Blog  /  {`${moment(item.createAt).format('DD MMMM, YYYY')}`}</h3>
								<h2 className="py-2 text-lg font-semibold text-color-main hover:text-color-sub">{item.title}</h2>
								<p className=" text-[14px] py-1 font-medium">{item.shortDes?.slice(0, 180)}....</p>
								<Link className='py-1 text-sm font-bold hover:text-color-sub' href={`blog/${item.username}`}>CONTINUE READING</Link>
							</div>
						</div>
					</Link>
				))
			}
		</div>
	)
}

function Blog() {
	return (
		<div className='py-2 md:px-20 md:py-4 bg-[#FCFCFD]'>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">ব্লগ</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<BlogsList />
			</Suspense>
			<div className="py-4 flex justify-center">
				<Button size={"lg"} className=' bg-white border-black  hover:border-color-sub text-black hover:bg-color-sub hover:text-white border-2' asChild>
					<Link href="/blog">আরো দেখুন</Link>
				</Button>
			</div>
		</div >
	)
}

export default Blog