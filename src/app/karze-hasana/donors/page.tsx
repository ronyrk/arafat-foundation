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
import { BranchIProps, DonorIProps } from '@/types';
import { unstable_noStore } from 'next/cache';
import { Input } from '@/components/ui/input';

async function DonorList() {
	unstable_noStore();
	let res = await fetch('https://arafatfoundation.vercel.app/api/donor');
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	const donors: DonorIProps[] = await res.json();

	return (
		<TableBody>
			{
				donors.map((item, index: number) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.code}</TableCell>
						<TableCell className="font-medium uppercase">{item.name}</TableCell>
						<TableCell className="font-medium uppercase" >{item.amount}</TableCell>
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