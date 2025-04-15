import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import DonationTable from '@/components/DonationTable';
import DisbursementTable from '@/components/DisbursementTable';
import { ChildCarousel } from '@/components/ChildCarousel';
import { unstable_noStore } from 'next/cache';
import { ChildIProps } from '@/types';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Share } from '@/components/Share';
import icon from "../../../../public/divider.svg"

type Props = {
	params: { username: string }
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

export async function generateMetadata({ params }: Props) {
	unstable_noStore();
	const user = await prisma.child.findUnique({
		where: {
			username: params.username
		}
	})
	return {
		title: user?.name,
		description: htmlConvert(user?.description as string),
		openGraph: {
			images: [
				{
					url: user?.photoUrl, // Must be an absolute URL
					width: 800,
					height: 600,
					alt: user?.name,
				},
				{
					url: user?.photoUrl, // Must be an absolute URL
					width: 1800,
					height: 1600,
					alt: user?.name,
				},
			],
		}
	}
};



async function page({ params }: {
	params: {
		username: string
	}
}) {
	const { username } = params;
	unstable_noStore();
	let res = await fetch(`https://af-admin.vercel.app/api/child/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ChildIProps = await res.json();
	return (
		<div className='py-2 mx-2'>
			<div className='flex md:flex-row flex-col md:gap-x-3 gap-y-1'>
				<div className="md:basis-3/12 w-full">
					<div className="relative h-fit flex flex-col border-2 rounded-md shadow-md ">
						<Image src={data.photoUrl} width={248} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='w-full h-[260px] object-fill rounded' alt={data.name} />
						<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">{data.academy}</p>
						<div className="w-full px-2 py-1 bg-white">
							<h2 className="py-2 text-xl font-semibold text-color-main hover:text-color-sub">{data.name}</h2>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px] font-medium">স্বপ্ন :</h2>
								<h2 className="text-[15px] pl-6 font-medium">{data.dream}</h2>
							</div>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px]  font-medium">ফোন :</h2>
								<h2 className="text-[15px] pl-4 font-medium">{data.phone}</h2>
							</div>
							<div className="flex flex-row py-1">
								<h2 className="text-[15px]  inline  font-medium">ঠিকানা:</h2>
								<h2 className="text-[15px] pl-2 font-medium">{data.address}</h2>
							</div>
							<div className="p-2 flex justify-center">
								<Button className='w-[130px] px-4 text-white rounded-sm bg-color-main hover:bg-color-sub' asChild>
									<Link href={`/donation/${data?.username}`}>স্পন্সর করুন</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="md:basis-9/12 w-full  border-[2px] px-1 flex flex-col gap-y-4 rounded-md h-fit shadow-md">
					<h2 className=" text-xl text-color-main font-semibold">{data.name}</h2>
					<div>{htmlConvert(data.description)}</div>
					<div className="px-1 flex flex-col border-[2px] rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation</h2>
						<DonationTable username={data.username} />
					</div>
					<div className="px-1 flex flex-col border-2 rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation Disbursement</h2>
						<DisbursementTable username={data.username} />
					</div>
				</div>
			</div>
			<div className="py-4 px-2">
				<Share type='sponsor-a-child' username={data.username} />
			</div>
			<div className=' border-t-2 py-4 w-full text-color-main' />
			<div className="mx-2">
				<h1 className="py-2 md:text-4xl text-xl font-semibold text-center text-color-main">একটি শিশুর দায়িত্ব নিন</h1>
				<h2 className="py-2 md:text-base text-[14px] font-medium text-center text-color-main">একটি শিশুর (আংশিক অথবা পূর্ণ) দায়িত্ব নেওয়ার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে সে ঝরে পড়ার ঝুঁকি ছাড়াই শিক্ষা লাভ করতে পারে।</h2>
				<h2 className="py-2 md:text-[15px] text-[14px] font-normal text-center text-color-main">আমাদের শিশু স্পনসরশিপ প্রোগ্রামে আপনি একটি শিশুর জন্য সহায়তা প্রদান করতে পারেন।</h2>
			</div>
			<div className='flex flex-col items-center justify-center gap-2'>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<ChildCarousel />
			<div className="flex justify-center py-4">
				<Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
					<Link href="/sponsor-a-child">আরো দেখুন</Link>
				</Button>
			</div>
		</div>
	)
}

export default page