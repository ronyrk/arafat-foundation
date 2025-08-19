import React, { Suspense, useMemo } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { DonorIProps, DonorPaymentIProps } from '@/types'
import moment from 'moment'
import { unstable_noStore } from 'next/cache'

interface ParamsIProps {
	data: DonorIProps
}

// Utility functions moved outside component to avoid recreation
const formatLoanAmount = (amount: string, type: string): string => {
	return type === "LENDING" ? `BDT =${amount}/=` : 'N/A'
}

const formatLoanPayment = (payment: string | null, donate: string | null): string => {
	const isPaymentEmpty = !payment || payment === "0"
	const isDonateEmpty = !donate || donate === "0"

	if (isPaymentEmpty && isDonateEmpty) {
		return 'N/A'
	}

	return isPaymentEmpty ? `BDT =${donate}/=` : `BDT =${payment}/=`
}

// Memoized table row component
const TableRowItem = React.memo(({ item, index }: { item: DonorPaymentIProps; index: number }) => {
	const formattedDate = useMemo(() => moment(item.createAt).format('DD/MM/YYYY'), [item.createAt])
	const loanAmount = useMemo(() => formatLoanAmount(item.amount as string, item.type), [item.amount, item.type])
	const paymentAmount = useMemo(() => formatLoanPayment(item.loanPayment as string, item.donate as string), [item.loanPayment, item.donate])

	return (
		<TableRow key={index}>
			<TableCell>{formattedDate}</TableCell>
			<TableCell>{loanAmount}</TableCell>
			<TableCell className='px-4'>{paymentAmount}</TableCell>
			<TableCell>{item.type}</TableCell>
		</TableRow>
	)
})

TableRowItem.displayName = 'TableRowItem'

async function TableRowList({ data }: ParamsIProps) {
	const { username } = data


	try {
		unstable_noStore();
		const response = await fetch(`https://af-admin.vercel.app/api/donor_payment/${username}`, {
			next: {
				revalidate: 0,
			}
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const result = await response.json()
		const paymentList: DonorPaymentIProps[] = result.data;

		return (
			<TableBody>
				{paymentList.map((item, index) => (
					<TableRowItem key={`${item.id || index}-${item.createAt}`} item={item} index={index} />
				))}
			</TableBody>
		)
	} catch (error) {
		console.error('Error fetching payment data:', error)
		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={4} className="text-center text-red-500">
						Error loading payment data
					</TableCell>
				</TableRow>
			</TableBody>
		)
	}
}

// Loading component
const TableSkeleton = () => (
	<TableBody>
		{[...Array(3)].map((_, i) => (
			<TableRow key={i}>
				<TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
				<TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
				<TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
				<TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
			</TableRow>
		))}
	</TableBody>
)

function DonorTable({ data }: ParamsIProps) {
	return (
		<div className='border-[2px] rounded-sm px-2'>
			<h2 className="text-center font-semibold text-xl py-2 text-color-main uppercase">
				Transaction
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>AMOUNT</TableHead>
						<TableHead>PAYMENT AMOUNT</TableHead>
						<TableHead>TYPE</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<TableSkeleton />}>
					<TableRowList data={data} />
				</Suspense>
			</Table>
		</div>
	)
}

export default DonorTable