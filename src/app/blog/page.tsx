import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../../public/divider.svg';
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
		<div className="grid md:grid-cols-3 grid-cols-1 justify-stretch md:gap-3 gap-1 p-2">
			{
				data.map((item, index) => (
					<Link key={index} href={`blog/${item.username}`}>
						<div className=" flex justify-center flex-col border-2 rounded-md shadow-xl  py-2">
							<Image src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
							<div className="w-full border-t-2 py-2 justify-around  bg-white px-2">
								<h3 className=" text-sm font-medium text-color-main hover:text-color-sub py-2">Blog  /  {`${moment(item.createAt).format('DD MMMM, YYYY')}`}</h3>
								<h2 className="  text-lg font-semibold text-color-main hover:text-color-sub py-2">{item.title}</h2>
								<p className=" text-[14px] py-1 font-medium">{item.shortDes}</p>
								<Link className=' text-sm font-bold py-1 hover:text-color-sub' href={`blog/${item.username}`}>CONTINUE READING</Link>
							</div>
						</div>
					</Link>
				))
			}
		</div>
	)
}

function Blogs() {
	return (
		<div className='py-2'>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-xl  text-color-main font-semibold border-dotted py-2">ব্লগ</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<BlogsList />
			</Suspense>
		</div >
	)
}

export default Blogs