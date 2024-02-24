import React, { Suspense } from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { BranchIProps, DonorIProps, DonorPaymentIProps } from '@/types';
import { unstable_noStore } from 'next/cache';
import { Input } from '@/components/ui/input';


async function DonorList() {
	unstable_noStore();
	let res = await fetch('https://arafatfoundation.vercel.app/api/donor');
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	const donors: DonorIProps[] = await res.json();


	const TotalAmount = async (status: string, username: string, amount: string) => {
		unstable_noStore();
		const response = await fetch(`https://arafatfoundation.vercel.app/api/donor_payment/donor/${username}`);
		if (!response.ok) {
			throw new Error("Failed fetch Data");
		};
		const paymentList: DonorPaymentIProps[] = await response.json();
		if (status === "LEADER") {
			const returnArray = paymentList.filter((item) => item.type === "return");
			let returnStringArray: string[] = [];
			returnArray.forEach((item) => returnStringArray.push(item.loanPayment));
			const returnNumberArray = returnStringArray.map(Number);
			const totalReturn = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

			const increaseArray = paymentList.filter((item) => item.type === "increase");
			let increaseStringArray: string[] = [];
			increaseArray.forEach((item) => increaseStringArray.push(item.amount));
			const increaseNumberArray = increaseStringArray.map(Number);
			const totalIncrease = increaseNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
			return totalIncrease - totalReturn;
		} else {
			let amountStringArray: string[] = [];
			const Create = paymentList.forEach((item) => amountStringArray.push(item.amount));
			// Convert String Array to Number Array
			let AmountArray = amountStringArray.map(Number);
			const totalAmount = AmountArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
			// console.log(totalAmount, 'number array');
			return `${totalAmount}`
		}

	}


	return (
		<TableBody>
			{
				donors.map((item, index: number) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.code}</TableCell>
						<TableCell className="font-medium uppercase">{item.name}</TableCell>
						<TableCell className="font-medium uppercase" >{TotalAmount(item.status, item.username, item.amount)}</TableCell>
						<TableCell className="font-medium uppercase">{item.status}</TableCell>
						<TableCell className="font-medium uppercase">
							<Button className='bg-color-sub' size={"sm"} asChild>
								<Link href={`donors/${item.username}`}>DETAILS</Link>
							</Button>

						</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	)
};



async function page() {
	return (
		<div className='flex flex-col'>
			<div className="px-4 py-2 flex justify-end">
				<Input className='w-64' type="text" placeholder="Search" />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>CODE</TableHead>
						<TableHead className='w-[300px]'>NAME</TableHead>
						<TableHead>AMOUNT</TableHead>
						<TableHead>TYPE</TableHead>
						<TableHead>DETAILS</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
					<DonorList />
				</Suspense>
			</Table>

		</div>
	)
}

export default page