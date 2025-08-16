import DonorTable from '@/components/DonorTable';
import PhotoBlur from '@/components/PhotoBlur';
import { Share } from '@/components/Share';
import { DonorIProps, DonorPaymentIProps, ParamsIProps } from '@/types'
import { unstable_noStore } from 'next/cache';
import React from 'react'
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getUser(username: string) {
	unstable_noStore();
	const res = await fetch(`https://af-admin.vercel.app/api/donor/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};

type Props = {
	params: { username: string }
};


export async function generateMetadata({ params }: Props) {
	const donor: DonorIProps = await getUser(params.username);
	// console.log(donor, "24");
	return {
		title: donor?.name,
		description: donor?.about,
		openGraph: {
			images: [
				{
					url: donor?.photoUrl, // Must be an absolute URL
					width: 800,
					height: 600,
					alt: donor?.name,
				},
				{
					url: donor?.photoUrl, // Must be an absolute URL
					width: 1800,
					height: 1600,
					alt: donor?.name,
				},
			],
		},
	};
};


async function page({ params }: ParamsIProps) {
	const { username } = params;
	const data: DonorIProps = await getUser(username);

	if (!data) {
		notFound();
	}

	unstable_noStore();

	const paymentList = await prisma.donorPayment.findMany({
		where: {
			donorUsername: username
		}
	}) as DonorPaymentIProps[];
	const TotalLending = async () => {
		const returnArray = paymentList.filter((item) => item.type === "LENDING");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.amount as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return total;
	}

	const TotalDonate = async () => {
		const returnArray = paymentList.filter((item) => item.type === "DONATE");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.donate as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return total;
	}
	const TotalRefound = async () => {
		const returnArray = paymentList.filter((item) => item.type === "REFOUND");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.loanPayment as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return total;
	}

	const Outstanding = async () => {
		const returnArray = paymentList.filter((item) => item.type === "LENDING");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.amount as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		let returnStringArray2: string[] = [];
		paymentList.forEach((item) => returnStringArray2.push(item.loanPayment as string));
		const returnNumberArray2 = returnStringArray2.map(Number);
		const payment = returnNumberArray2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		const returnArray3 = paymentList.filter((item) => item.type === "DONATE");
		let returnStringArray3: string[] = [];
		returnArray3.forEach((item) => returnStringArray3.push(item.donate as string));
		const returnNumberArray3 = returnStringArray3.map(Number);
		const donate = returnNumberArray3.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		return (total - payment) - donate;
	}
	const DonorTotalAmount = async () => {
		const returnArray = paymentList.filter((item) => item.type === "LENDING");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.amount as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		const returnArray3 = paymentList.filter((item) => item.type === "DONATE");
		let returnStringArray3: string[] = [];
		returnArray3.forEach((item) => returnStringArray3.push(item.donate as string));
		const returnNumberArray3 = returnStringArray3.map(Number);
		const donate = returnNumberArray3.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		return total + donate;
	}

	async function getStatus(status: string) {
		if (status === "LEADER") {
			return "LENDER"
		} else {
			return status
		}
	};

	return (
		<div className='flex flex-col gap-3'>
			<div className="flex md:flex-row flex-col justify-between gap-3 px-2">
				<div className=" basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
					<PhotoBlur name={data.name} url={data.photoUrl} />
					<span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] lowercase font-normal p-[2px] rounded">{getStatus(data.status)}</span>
				</div>
				<div className="basis-9/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-1  text-color-main">{data.name}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Lives in :</span>{data.lives} </h2>
					{
						data.status === "LEADER" ? (
							<>
								<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Total Lending :- </span>{TotalLending()}</h2>
								<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Total Donate :- </span>{TotalDonate()}</h2>
								<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Total Refound :- </span>{TotalRefound()}</h2>
								<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Outstanding :- </span>{Outstanding()}</h2>
							</>
						) : <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">Total Donate :- </span>{DonorTotalAmount()}</h2>
					}
				</div>
			</div>
			<div className="p-4">
				<h2 className="text-[16px] font-normal text-color-main">{data.about} </h2>
			</div>
			<div className="py-2 px-4">
				<Share username={data?.username} type='karze-hasana/donor-and-lenders' />
			</div>
			<DonorTable data={data} />
		</div>
	)
}

export default page