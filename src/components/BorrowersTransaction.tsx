import React, { Suspense, useMemo } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LoanIProps, PaymentIProps } from '@/types';
import Moment from "moment"
import PaymentRequest from './PaymentRequest';

// Utility function moved outside component to prevent recreation
const formatAmount = (data: string): string => {
	const amount = Number(data);
	return amount !== 0 ? `BDT=${data}/=` : " ";
};

// Pre-calculate all outstanding amounts efficiently
const calculateOutstandingAmounts = (paymentList: PaymentIProps[], initialBalance: number): string[] => {
	let runningLoanTotal = initialBalance;
	let runningPaymentTotal = 0;

	return paymentList.map((payment) => {
		runningLoanTotal += Number(payment.loanAmount);
		runningPaymentTotal += Number(payment.amount);
		const outstanding = runningLoanTotal - runningPaymentTotal;
		return `BDT=${outstanding}/=`;
	});
};

// Memoized table rows component
const LoanTableRows = React.memo(({
	paymentList,
	outstandingAmounts
}: {
	paymentList: PaymentIProps[],
	outstandingAmounts: string[]
}) => {
	return (
		<TableBody>
			{paymentList.map((item, index) => (
				<TableRow key={`${item.loanusername}-${index}`}>
					<TableCell>
						{Moment(item.createAt).format('DD/MM/YYYY')}
					</TableCell>
					<TableCell>
						{formatAmount(item.loanAmount)}
					</TableCell>
					<TableCell>
						{formatAmount(item.amount)}
					</TableCell>
					<TableCell>
						{outstandingAmounts[index]}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
});

LoanTableRows.displayName = 'LoanTableRows';

function BorrowersTransaction({
	username,
	data,
	paymentList
}: {
	username: string,
	data: LoanIProps,
	paymentList: PaymentIProps[]
}) {
	// Memoize the outstanding amounts calculation
	const outstandingAmounts = useMemo(() =>
		calculateOutstandingAmounts(paymentList, Number(data.balance)),
		[paymentList, data.balance]
	);

	return (
		<div className='border-[2px] rounded-sm px-2'>
			<PaymentRequest username={username} branch={data.branch} />
			<h2 className="text-center font-semibold text-xl py-2 text-color-main uppercase">
				Transaction
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>LOAN AMOUNT</TableHead>
						<TableHead>LOAN PAYMENT</TableHead>
						<TableHead>LOAN OUTSTANDING</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={
					<TableBody>
						<TableRow>
							<TableCell colSpan={4} className="text-center py-4">
								Loading...
							</TableCell>
						</TableRow>
					</TableBody>
				}>
					<LoanTableRows
						paymentList={paymentList}
						outstandingAmounts={outstandingAmounts}
					/>
				</Suspense>
			</Table>
		</div>
	)
}

export default BorrowersTransaction