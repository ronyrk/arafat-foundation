import BorrowersList from '@/components/BorrowersList';
import { BranchIProps, ParamsIProps } from '@/types'
import { cookies } from 'next/headers';
import React from 'react'
import prisma from '@/lib/prisma';
import { unstable_noStore } from 'next/cache';
import { Share } from '@/components/Share';

type Props = {
	params: { username: string }
};

export async function generateMetadata({ params }: Props) {
	unstable_noStore();
	const username = params.username;
	const data = await prisma.branch.findUnique({ where: { username } });
	return {
		title: data?.branchName,
		openGraph: {
			images: [
				{
					url: data?.photoUrl.at(0), // Must be an absolute URL
					width: 800,
					height: 600,
					alt: data?.branchName,
				},
				{
					url: data?.photoUrl.at(0), // Must be an absolute URL
					width: 1800,
					height: 1600,
					alt: data?.branchName,
				},
			],
		}
	}
};

async function getData(username: string) {
	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/branch/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};


async function page({ params }: ParamsIProps) {
	cookies();
	const { username } = params;
	const response = await getData(username);
	const data: BranchIProps = await response.info;
	return (
		<div className='p-1 px-4 border-2 rounded'>
			<div className="flex flex-col">
				<h2 className="py-1 text-2xl font-medium text-center text-color-main">Branch details</h2>
				<h2 className="py-1 text-3xl font-medium text-center text-color-main">{data.branchName}</h2>
				<h2 className="py-1 text-xl font-medium text-center text-color-main">ঠিকানা:- {data.address}</h2>
			</div>
			<BorrowersList response={response} />
			<div className="py-2 px-4">
				<Share username={data.username} type='branches' />
			</div>
		</div>
	)
}

export default page