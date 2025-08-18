import Image from 'next/image';
import React from 'react'
import { Share } from '@/components/Share';
import { CarouselDemo } from '@/components/CarouselType';
import { unstable_noStore } from 'next/cache';
import { ProjectsProps } from '@/types';
import { getProjectSingle } from '@/lib/getProjectSingle';
import ProjectDonation from '@/components/ProjectDonation';
import icon from "../../../../public/divider.svg"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';


type Props = {
	params: { username: string }
};

export async function generateMetadata({ params }: Props) {
	const news = await getProjectSingle(params.username);
	return {
		title: news?.title,
		description: news?.description,
		openGraph: {
			images: [
				{
					url: news?.photoUrl, // Must be an absolute URL
					width: 800,
					height: 600,
					alt: news?.title,
				},
				{
					url: news?.photoUrl, // Must be an absolute URL
					width: 1800,
					height: 1600,
					alt: news?.title,
				},
			],
		}
	}
};

function htmlConvert(data: string) {
	const jsonAndHtml = data.split("^");
	const html = jsonAndHtml[0];
	return (
		<div className="py-2">
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}

async function page({ params }: {
	params: {
		username: string
	}
}) {
	const username = params.username;

	unstable_noStore();
	let res = await fetch(`https://af-admin.vercel.app/api/project/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ProjectsProps = await res.json();

	if (!data) {
		notFound();
	}

	return (
		<div className=''>
			<div className="flex md:flex-row flex-col gap-1">
				<div className="md:basis-2/3 w-full pr-1">
					<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={data.photoUrl} width={828} height={420} className='md:w-[828px] md:h-[420px] object-fill rounded' alt={data.username} />
					<div className="py-3">
						<h2 className=" text-[26px] text-color-main font-semibold">{data.title}</h2>
					</div>
					<div className="">
						<p className=" text-sm  font-medium leading-relaxed">
							{htmlConvert(data.description)}
						</p>
						<div className="py-3">
							<Share type='our-projects' username={data.username} />
						</div>
					</div>
				</div>
				<div className=" md:basis-1/3 w-full pl-1">
					<ProjectDonation data={data} />
				</div>
			</div>
			<div className=' border-t-2 py-4 w-full text-color-main' />
			<h1 className="py-2 md:text-4xl text-2xl font-semibold text-center text-color-main">চলুন সবাই মিলে ভালো কিছু করি</h1>
			<h2 className="py-2 md:text-xl text-[16px] font-medium text-center text-color-main">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h2>
			<div className='flex flex-col items-center justify-center gap-2 '>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<CarouselDemo />
			<div className="flex justify-center py-4">
				<Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
					<Link prefetch={false} href="/our-projects">আরো দেখুন</Link>
				</Button>
			</div>
		</div>
	)
}

export default page