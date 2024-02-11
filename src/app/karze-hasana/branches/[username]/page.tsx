import BorrowersList from '@/components/BorrowersList';
import { BranchIProps, ParamsIProps } from '@/types'
import React from 'react'

async function getData(username: string) {
	const res = await fetch(`https://arafatfoundation.vercel.app/api/branch/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};

async function page({ params }: ParamsIProps) {
	const { username } = params;
	const response = await getData(username);
	const data: BranchIProps = await response.info;
	return (
		<div className='px-4 border-2 rounded p-1'>
			<div className="flex flex-col">
				<h2 className="text-center text-2xl font-medium text-color-main py-1">Branch details</h2>
				<h2 className="text-center text-3xl font-medium text-color-main py-1">{data.branchName}</h2>
				<h2 className="text-center text-xl font-medium text-color-main py-1">ঠিকানা:- {data.address}</h2>
			</div>
			<BorrowersList response={response} />
		</div>
	)
}

export default page