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
		<div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-3 justify-stretch md:gap-3">
			{
				data.map((item, index) => (
					<div key={index} className="flex flex-col border-2 rounded shadow-md ">
						<Link prefetch={false} href={`/our-projects/${item.username}`}>
							<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
							<div className="w-full px-2 bg-white">
								<h2 className="py-2 text-lg font-semibold text-color-main hover:text-color-sub">{item.title}</h2>
								<p className=" text-[14px] font-medium">{item.shortDes.slice(0, 200)}....</p>
								<div className="flex justify-between py-2 md:flex-row">
									<Button className=' hover:bg-color-sub' asChild>
										<Link prefetch={false} href={`our-projects/${item.username}`}>বিস্তারিত দেখুন</Link>
									</Button>
									<Button variant={"outline"} className='border-2 text-color-main border-color-main hover:text-white hover:border-color-sub' asChild>
										<Link prefetch={false} href={`/our-projects/${item.username}`}>দান করুন</Link>
									</Button>
								</div>
							</div>
						</Link>
					</div>
				))
			}
		</div>
	)
}

function ProjectList() {
	return (
		<div className='py-2'>
			<h1 className="py-2 text-4xl font-semibold text-center text-color-main">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="py-2 text-xl font-medium text-center text-color-main">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Projects />
			</Suspense>
		</div >
	)
}

export default ProjectList