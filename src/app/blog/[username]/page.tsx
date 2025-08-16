import Image from 'next/image';
import React from 'react'
import { CircleUserRound, CalendarDays } from 'lucide-react';
import { Share } from '@/components/Share';
import { unstable_noStore } from 'next/cache';
import { NewsProps, ProjectsProps } from '@/types';
import moment from 'moment';
import NewsPortal from '@/components/NewsPortal';
import { getNews } from '@/lib/getNews';
import { getNewsSingle } from '@/lib/getNewsSingle';
import { notFound } from 'next/navigation';

type Props = {
	params: { username: string }
};

export async function generateMetadata({ params }: Props) {
	const news = await getNewsSingle(params.username);
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

async function htmlConvert(data: string) {
	const jsonAndHtml = data.split("^");
	const html = jsonAndHtml[0];

	return (
		<main className="py-2">
			<section dangerouslySetInnerHTML={{ __html: html }} />
		</main>
	)
}

async function page({ params, searchParams }: {
	params: {
		username: string
	},
	searchParams?: {
		news?: string,
	}
}) {
	const username = params.username;
	const query = searchParams?.news || "all";

	const newsList = await getNews(query);

	unstable_noStore();
	let res = await fetch(`https://af-admin.vercel.app/api/news/${username}`);
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
				<div className="md:basis-3/4 w-full">
					<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={data?.photoUrl} width={828} height={420} className='md:w-[828px] md:h-[420px] object-fill rounded' alt={data.username} />
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
				<div className=" md:basis-1/4 w-full pl-2">
					<NewsPortal newsList={newsList} />
				</div>
			</div>
		</div>
	)
}

export default page