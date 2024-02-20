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
import PaymentRequest from './PaymentRequest';

async function LoanList({ username, loanAmount }: { username: string, loanAmount: string }) {
	unstable_noStore();
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan_list/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const data: PaymentIProps[] = await res.json();

	const loadAmountMain = async (amount: string, index: number) => {
		const sumArray = data.slice(0, index);
		let indexPaymentString: string[] = ["0"];
		const result = sumArray.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(amount));
		return `${loanSumAmount}`;
	};

	const loanOutStanding = async (amount: string, index: number, paymentAmount: string) => {
		const sumArray = data.slice(0, index);
		const payment = Number(paymentAmount);
		let indexPaymentString: string[] = ["0"];
		sumArray.forEach((item) => indexPaymentString.push(item.amount));
		let indexPayment = indexPaymentString.map(Number);
		const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(amount));
		const result = loanSumAmount - payment;
		return result;
	}

	return (
		<TableBody>
			{
				data.map((item, index) => (
					<TableRow key={index}>
						<TableCell>{`${Moment(item.createAt).subtract(1, "years").format('DD/MM/YYYY')}`}</TableCell>
						<TableCell>BDT ={loadAmountMain(loanAmount, index)}/=</TableCell>
						<TableCell>BDT ={item.amount}/=</TableCell>
						<TableCell>BDT ={loanOutStanding(loanAmount, index, item.amount)}/=</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	)
}


function BorrowersTransaction({ username, loanAmount }: { username: string, loanAmount: string }) {
	return (
		<div className=' border-[2px] rounded-sm px-2'>
			<PaymentRequest />
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