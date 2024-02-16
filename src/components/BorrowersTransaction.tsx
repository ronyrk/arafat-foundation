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
import { unstable_noStore } from 'next/cache';
import { PaymentIProps } from '@/types';
import Moment from "moment"

async function LoanList({ username, loanAmount }: { username: string, loanAmount: string }) {
	const options: any = { year: 'numeric', month: '2-digit', day: '2-digit' };

	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan_list/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const data: PaymentIProps[] = await res.json();

	const loadAmount = async (amount: string, index: number) => {
		const sumArray = data.slice(0, index + 1);
		let indexPaymentString: string[] = [];
		const result = sumArray.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, 500000);
		console.log(loanSumAmount, amount, "sum read");
		return "9000"
	}

	return (
		<TableBody>
			{
				data.map((item, index) => (
					<TableRow key={index}>
						<TableCell>{`${Moment(item.createAt).subtract(1, "years").format('DD/MM/YYYY')}`}</TableCell>
						<TableCell>BDT ={loadAmount(item.amount, index)}/=</TableCell>
						<TableCell>BDT ={item.amount}/=</TableCell>
						<TableCell>BDT ={parseInt(loanAmount) - parseInt(item.amount)}/=</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	)
}


function BorrowersTransaction({ username, loanAmount }: { username: string, loanAmount: string }) {
	return (
		<div className=' border-[2px] rounded-sm px-2'>
			<h2 className=" text-center font-semibold text-xl py-2 text-color-main uppercase">Transaction</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>LOAD AMOUNT</TableHead>
						<TableHead>LOAN PAYMENT</TableHead>
						<TableHead>LOAN OUTSTANDING</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
					<LoanList username={username} loanAmount={loanAmount} />
				</Suspense>
			</Table>

		</div>
	)
}

export default BorrowersTransaction