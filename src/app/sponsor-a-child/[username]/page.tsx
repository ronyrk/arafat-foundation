import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import DonationTable from '@/components/DonationTable';
import DisbursementTable from '@/components/DisbursementTable';
import { ChildCarousel } from '@/components/ChildCarousel';
import { unstable_noStore } from 'next/cache';
import { ChildIProps } from '@/types';
import { SingleShare } from '@/components/SingleShare';
import Link from 'next/link';
import prisma from '@/lib/prisma';

type Props = {
	params: { username: string }
};
async function htmlConvert(data: string) {
	return (
		<div className="py-2">
			<div dangerouslySetInnerHTML={{ __html: data }} />
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
		<div className='py-2 '>
			<div className='flex gap-x-3'>
				<div className="basis-3/12">
					<div className="relative h-fit flex flex-col border-2 rounded-md shadow-md ">
						<Image src={data.photoUrl} width={248} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='w-full h-[260px] object-fill rounded' alt={data.name} />
						<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">স্কুল</p>
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
				<div className="basis-9/12 border-2 p-3 flex flex-col gap-y-4 rounded-md h-fit shadow-md">
					<h2 className=" text-xl text-color-main font-semibold">{data.name}</h2>
					<div>{htmlConvert(data.description)}</div>
					<div className="px-4 flex flex-col border-2 rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation</h2>
						<DonationTable username={data.username} />
					</div>
					<div className="px-4 flex flex-col border-2 rounded-md py-2 gap-y-2">
						<h2 className="text-center text-lg font-semibold text-color-main">Details Of Donation Disbursement</h2>
						<DisbursementTable username={data.username} />
					</div>
				</div>
			</div>
			<div className="py-4 px-2">
				<SingleShare type='sponsor-a-child' username={data.username} />
			</div>
			<ChildCarousel />
		</div>
	)
}

export default page