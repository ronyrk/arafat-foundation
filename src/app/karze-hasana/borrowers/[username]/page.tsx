import BorrowersDocuments from '@/components/BorrowersDocuments';
import BorrowersTransaction from '@/components/BorrowersTransaction';
import PhoneNumber from '@/components/PhoneNumber';
import { LoanIProps, ParamsIProps, PaymentIProps } from '@/types'
import { unstable_noStore } from 'next/cache';
import Image from 'next/image';
import React from 'react'

export async function getUser(username: string) {
	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};

async function page({ params }: ParamsIProps) {
	const { username } = params;

	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan_list/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const paymentList: PaymentIProps[] = await res.json();

	const data: LoanIProps = await getUser(username);

	const duePayment = async () => {
		let indexPaymentString: string[] = ["0"];
		const result = paymentList.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(data.balance));
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
					<Image className=' rounded-md object-cover' src={data.photosUrl} alt={data.name} width={260} height={140} />
					<span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] font-normal p-[2px] rounded">ঋণগ্রহীতা</span>
				</div>
				<div className="basis-5/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-1  text-color-main">{data.name}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>{data.address}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">পেশা:</span>{data.occupation}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট ঋণ:</span>{data.balance}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট পরিশোধিত ঋণ:</span>{allPayment()}</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">বকেয়া ঋণ:</span>{duePayment()}</h2>
					<PhoneNumber phone={data.phone} />
				</div>
				<BorrowersDocuments data={data} />
			</div>
			<div className="p-4">
				<h2 className="text-[16px] font-normal text-color-main">{data.about} </h2>
			</div>
			<BorrowersTransaction username={username} data={data} loanAmount={data.balance} />
		</div>
	)
}

export default page