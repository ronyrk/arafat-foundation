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
import { BranchIProps } from '@/types';
import { unstable_noStore } from 'next/cache';

async function BranchList() {
	unstable_noStore();
	let res = await fetch('https://arafatfoundation.vercel.app/api/branch');
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	let branches: BranchIProps[] = await res.json();

	return (
		<TableBody>
			{
				branches.map((item, index: number) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell className="font-medium uppercase">{item.mosjid}</TableCell>
						<TableCell className="font-medium uppercase" >{item.district}</TableCell>
						<TableCell className="font-medium uppercase">{item.name}</TableCell>
						<TableCell className="font-medium uppercase">
							<Button size={"sm"} asChild>
								<Link className=' bg-color-sub hover:bg-color-main ' href={`/branch/${item.username}`}>DETAILS</Link>
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
		<div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>INDEX</TableHead>
						<TableHead>BRANCH</TableHead>
						<TableHead>DISTRICT</TableHead>
						<TableHead>P. NAME</TableHead>
						<TableHead>DETAILS</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
					<BranchList />
				</Suspense>
			</Table>

		</div>
	)
}

export default page