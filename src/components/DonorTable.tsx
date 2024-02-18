import React from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"


function DonorTable(params: any) {
	console.log(params, "log")
	return (
		<div className=' border-[2px] rounded-sm px-2'>
			<h2 className=" text-center font-semibold text-xl py-2 text-color-main uppercase">Transaction</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DATE</TableHead>
						<TableHead>LOAD AMOUNT</TableHead>
						<TableHead>LOAN PAYMENT</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>29/12/2023</TableCell>
						<TableCell>BDT =10,000/=</TableCell>
						<TableCell>BDT =000/=</TableCell>
					</TableRow>
				</TableBody>
			</Table>

		</div>
	)
}

export default DonorTable