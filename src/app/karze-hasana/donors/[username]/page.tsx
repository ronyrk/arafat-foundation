import DonorTable from '@/components/DonorTable';
import { DonorIProps, ParamsIProps } from '@/types'
import Image from 'next/image';
import React from 'react'

async function getUser(username: string) {
	const res = await fetch(`https://arafatfoundation.vercel.app/api/donor/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};

async function page({ params }: ParamsIProps) {
	const { username } = params;
	const data: DonorIProps = await getUser(username);
	return (
		<div className='flex flex-col gap-3'>
			<div className="flex md:flex-row flex-col justify-between gap-3 px-2">
				<div className=" basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
					<Image className=' rounded-md object-cover' src={data.photoUrl} alt={data.name} width={260} height={140} />
					<span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] font-normal p-[2px] rounded">Donor</span>
				</div>
				<div className="basis-9/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-1  text-color-main">{data.name}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Lives in :</span>{data.lives} </h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Home town:</span>{data.hometown}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Total Lending:</span>{data.amount}</h2>
				</div>
			</div>
			<div className="p-4">
				<h2 className="text-[16px] font-normal text-color-main">{data.about} </h2>
			</div>
			<DonorTable data={data} />
		</div>
	)
}

export default page