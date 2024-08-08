import AddressBlur from '@/components/AddressBlur';
import BorrowersDocuments from '@/components/BorrowersDocuments';
import BorrowersTransaction from '@/components/BorrowersTransaction';
import PhoneNumber from '@/components/PhoneNumber';
import PhotoBlur from '@/components/PhotoBlur';
import { Share } from '@/components/Share';
import { LoanIProps, ParamsIProps, PaymentIProps } from '@/types'
import { unstable_noStore } from 'next/cache';
import React from 'react'


type Props = {
	params: { username: string }
};
export async function getUser(username: string) {
	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};


export async function generateMetadata({ params }: Props) {
	const user: LoanIProps = await getUser(params.username);
	return {
		title: user.name,
		description: user.about,
		openGraph: {
			images: [
				{
					url: user.photosUrl, // Must be an absolute URL
					width: 800,
					height: 600,
					alt: user.name,
				},
				{
					url: user.photosUrl, // Must be an absolute URL
					width: 1800,
					height: 1600,
					alt: user.name,
				},
			],
		}
	}
};



async function page({ params }: ParamsIProps) {
	const { username } = params;

	unstable_noStore();
	const res = await fetch(`https://af-admin.vercel.app/api/loan_list/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const paymentList: PaymentIProps[] = await res.json();

	const data = await getUser(username);

	const totalBalance = async () => {
		let indexPaymentString: string[] = ["0"];
		const result = paymentList.forEach((item) => indexPaymentString.push(item.loanAmount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator + currentValue, Number(data.balance));
		return `${loanSumAmount}`;
	}

	const duePayment = async () => {
		let indexPaymentString2: string[] = ["0"];
		paymentList.forEach((item) => indexPaymentString2.push(item.loanAmount));
		let indexPayment2 = indexPaymentString2.map(Number);
		const totalBalance = indexPayment2.reduce((accumulator, currentValue) => accumulator + currentValue, Number(data.balance));

		let indexPaymentString: string[] = ["0"];
		const result = paymentList.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, totalBalance);
		return `${loanSumAmount}`;
	}

	const allPayment = async () => {
		let indexPaymentString: string[] = ["0"];
		const result = paymentList.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const Amount = indexPayment.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return `${Amount}`;
	}

	return (
		<div className='flex flex-col gap-3'>
			<div className="flex md:flex-row flex-col justify-between gap-3 px-2">
				<div className=" basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
					<PhotoBlur url={data?.photosUrl} name={data?.name} />
					<span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] font-normal p-[2px] rounded">ঋণগ্রহীতা</span>
				</div>
				<div className="basis-5/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-1  text-color-main">{data.name}</h2>
					<AddressBlur address={data.address} />
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">পেশা:</span>{data.occupation}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট ঋণ:</span>{totalBalance()}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট পরিশোধিত ঋণ:</span>{allPayment()}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">বকেয়া ঋণ:</span>{duePayment()}</h2>
					<PhoneNumber phone={data.phone} />
				</div>
				<BorrowersDocuments data={data} />
			</div>
			<div className="py-2 px-4">
				<Share username={data.username} type='borrowers' />
			</div>
			<div className="p-4">
				<h2 className="text-[16px] font-normal text-color-main">{data.about} </h2>
			</div>
			<BorrowersTransaction username={username} data={data} />
		</div>
	)
}

export default page