import Image from 'next/image'
import React, { Suspense } from 'react'
import icon from '../../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { unstable_noStore } from 'next/cache';
import { ProjectsProps } from '@/types';

async function Projects() {
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

function ProjectList() {
	return (
		<div className='py-2'>
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="text-center text-xl  text-color-main font-medium py-2">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-xl  text-color-main font-semibold border-dotted py-2">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Projects />
			</Suspense>
		</div >
	)
}

export default ProjectList