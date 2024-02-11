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
import { BranchIProps, DonorIProps, LoanIProps } from '@/types';
import { unstable_noStore } from 'next/cache';
import { Input } from '@/components/ui/input';

async function BorrowersList() {
	unstable_noStore();
	let res = await fetch('https://arafatfoundation.vercel.app/api/loan');
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	const borrowers: LoanIProps[] = await res.json();

	return (
		<TableBody>
			{
				borrowers.map((item, index: number) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.code}</TableCell>
						<TableCell className="font-medium uppercase">{item.name}</TableCell>
						<TableCell className="font-medium uppercase" >{item.disbursed}</TableCell>
						<TableCell className="font-medium uppercase">{item.recovered}</TableCell>
						<TableCell className="font-medium uppercase">{item.balance}</TableCell>
						<TableCell className="font-medium uppercase">
							<Button className='bg-color-sub' size={"sm"} asChild>
								<Link href={`borrowers/${item.username}`}>DETAILS</Link>
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
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>CODE</TableHead>
						<TableHead className='w-[300px]'>BORROWERS NAME</TableHead>
						<TableHead>DISBURSED</TableHead>
						<TableHead>RECOVERED</TableHead>
						<TableHead>BALANCE</TableHead>
						<TableHead>DETAILS</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
					<BorrowersList />
				</Suspense>
			</Table>

		</div>
	)
}

export default page