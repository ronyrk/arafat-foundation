import React, { Suspense } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { DonorIProps, DonorPaymentIProps } from '@/types'
import moment from 'moment';
import { unstable_noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { string } from 'zod';

interface ParamsIProps {
	data: DonorIProps
}

async function TableRowList(params: ParamsIProps) {
	const { status, username } = params.data;
	unstable_noStore();
	const data = await prisma.donorPayment.findMany({
		where: {
			donorUsername: username
		},
		orderBy: {
			createAt: "asc"
		}
	}) as DonorPaymentIProps[];

	const loanAmount = async (amount: string, type: string) => {
		if (type === "LENDING") {
			return `BDT =${amount}/=`
		} else {
			return 'N/A'
		}
	}

	const loanPayment = async (payment: string, donate: string) => {
		if (payment === "0" && donate === "0") {
			return ` N/A`
		} else if (payment === "0") {
			return `BDT =${donate}/=`
		} else {
			return `BDT =${payment}/=`
		}
	};
	return (
		<TableBody>
			{
				data.map((item, index) => (
					<TableRow key={index}>
						<TableCell>{`${moment(item.createAt).format('DD/MM/YYYY')}`}</TableCell>
						<TableCell>{loanAmount(item.amount as string, item.type)}</TableCell>
						<TableCell className='px-4'>{loanPayment(item.loanPayment as string, item.donate as string)} </TableCell>
						<TableCell className=''>{item.type} </TableCell>
					</TableRow>
				))
			}
		</TableBody>
	)

}


function DonorTable(params: ParamsIProps) {
	return (
		<div className=' border-[2px] rounded-sm px-2'>
			<h2 className=" text-center font-semibold text-xl py-2 text-color-main uppercase">Transaction</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>AMOUNT</TableHead>
						<TableHead>PAYMENT AMOUNT</TableHead>
						<TableHead>TYPE</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2>Loading...</h2>}>
					<TableRowList data={params.data} />
				</Suspense>
			</Table>

		</div>
	)
}

export default DonorTable