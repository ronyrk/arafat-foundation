import React, { Suspense } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { unstable_noStore } from 'next/cache';
import { LoanIProps, PaymentIProps } from '@/types';
import Moment from "moment"
import { Button } from './ui/button';
import PaymentRequest from './PaymentRequest';

function Zero(data: string) {
	if (Number(data) !== 0) {
		return `BDT=${data}/=`
	} else {
		return " "
	}
};

async function LoanList({ username }: { username: string }) {
	try {
		unstable_noStore();
		const res = await fetch(`https://af-admin.vercel.app/api/loan_list/${username}`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const data: PaymentIProps[] = await res.json();
		// const calculateRemainingLoanAmount = async (amount: string, index: number) => {
		//     const sumArray = data.slice(0, index);
		//     let indexPaymentString: string[] = ["0"];
		//     sumArray.forEach((item) => indexPaymentString.push(item.amount));
		//     let indexPayment = indexPaymentString.map(Number)
		//     const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(amount));
		//     return `${loanSumAmount}`;
		// };

		// const calculateRemainingLoanAmountStanding = async (amount: string, index: number, paymentAmount: string) => {
		//     const sumArray = data.slice(0, index);
		//     const payment = Number(paymentAmount);
		//     let indexPaymentString: string[] = ["0"];
		//     sumArray.forEach((item) => indexPaymentString.push(item.amount));
		//     let indexPayment = indexPaymentString.map(Number);
		//     const loanSumAmount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(amount));
		//     const result = loanSumAmount - payment;
		//     return result;
		// }

		return (
			<TableBody>
				{
					data.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{`${Moment(item.createAt).format('DD/MM/YYYY')}`}</TableCell>
							<TableCell>{Zero(item.loanAmount)}</TableCell>
							<TableCell>{Zero(item.amount)}</TableCell>
						</TableRow>
					))
				}
			</TableBody>
		)
	} catch (error) {
		throw new Error("Data fetch failed");
	}
}


function BorrowersTransaction({ username, data }: { username: string, data: LoanIProps }) {
	return (
		<div className=' border-[2px] rounded-sm px-2'>
			<PaymentRequest username={username} branch={data.branch} />
			<h2 className=" text-center font-semibold text-xl py-2 text-color-main uppercase">Transaction</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>LOAN AMOUNT</TableHead>
						<TableHead>LOAN PAYMENT</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
					<LoanList username={username} />
				</Suspense>
			</Table>

		</div>
	)
}

export default BorrowersTransaction