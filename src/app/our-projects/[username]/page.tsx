import Image from 'next/image';
import React from 'react'
import { CircleUserRound, CalendarDays } from 'lucide-react';
import { Share } from '@/components/Share';
import { CarouselDemo } from '@/components/CarouselType';
import DonorCard from '@/components/DonorCard';
import { unstable_noStore } from 'next/cache';
import { ProjectsProps } from '@/types';
import moment from 'moment';

async function htmlConvert(data: string) {
	return (
		<div className="py-2">
			<div dangerouslySetInnerHTML={{ __html: data }} />
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

	return (
		<div className='py-4 px-1'>
			<div className="flex md:flex-row flex-col gap-1">
				<div className="md:basis-2/3 w-full px-2">
					<Image src={data.photoUrl} width={828} height={420} className='md:w-[828px] md:h-[420px] object-fill rounded' alt={data.username} />
					<div className="py-2 flex flex-row gap-2">
						<h2 className=' flex items-center'><CircleUserRound size={20} /> <span className=' text-sm font-medium px-2'>{data.author}</span> </h2>
						<h2 className=' flex items-center'><CalendarDays size={20} /> <span className=' text-sm font-medium px-2'>{`${moment(data.createAt).format('MMMM DD, YYYY')}`}</span> </h2>
					</div>
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
				<div className=" md:basis-1/3 w-full px-3">
					<DonorCard />
				</div>
			</div>
			<CarouselDemo />
		</div>
	)
}

export default page