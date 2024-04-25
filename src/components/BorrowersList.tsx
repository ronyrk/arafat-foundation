"use server";
import React, { Suspense } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { BranchIProps, LoanIProps, MemberIProps, ParamsIProps, PaymentIProps } from '@/types';
import Image from 'next/image';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { getUser } from '@/app/karze-hasana/borrowers/[username]/page';
import { unstable_noStore } from 'next/cache';
import MemberCreateButton from './MemberCreateButton';
import prisma from '@/lib/prisma';
import { getBorrowersByBranch } from '@/lib/getBorrowers';
import PaginationPart from './Pagination';
import { getSearchBorrowersByBranch } from '@/lib/SearchBorrowers';

interface RequestParams {
	response: {
		info: BranchIProps,
		loanList: LoanIProps[],
	},
	page: string,
};

async function MemberList({ username }: { username: string }) {
	unstable_noStore();
	const user = await prisma.member.findMany({ where: { branch: username } });

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-3">
				<AccordionTrigger className='text-lg font-medium text-color-main'>সদস্য</AccordionTrigger>
				<AccordionContent className=' flex flex-col gap-3'>
					<MemberCreateButton username={username} />
					<div className='flex flex-col gap-3'>
						{
							user.map((item, index) => (
								<div key={index} className="flex md:flex-row flex-col gap-1">
									<div className="md:basis-9/12 w-full border-[2px] rounded md:px-4 px-2 flex flex-col justify-around">
										<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{item.teamMemberName}</h2>
										<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{item.teamMemberPhone}</h2>
										<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{item.teamMemberAddress}</h2>
										<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{item.teamMemberOccupation}</h2>
									</div>

									<div className="md:basis-3/12 w-full border-[2px]  flex justify-around rounded">
										<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover rounded' src={item.teamMemberPhotoUrl} alt={item.teamMemberName} width={260} height={140} />
									</div>

								</div>
							))
						}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}



async function duePayment(username: string) {
	unstable_noStore();
	const response = await fetch(`https://arafatfoundation.vercel.app/api/loan_list/${username}`);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	const paymentList: PaymentIProps[] = await response.json();
	const data: LoanIProps = await getUser(username);

	let indexPaymentString: string[] = ["0"];
	const result = paymentList.forEach((item) => indexPaymentString.push(item.amount));
	let indexPayment = indexPaymentString.map(Number);
	const Amount = indexPayment.reduce((accumulator, currentValue) => accumulator - currentValue, Number(data.balance));
	return `${Amount}`;
}
async function allPayment(username: string) {
	unstable_noStore();
	const response = await fetch(`https://arafatfoundation.vercel.app/api/loan_list/${username}`);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	const paymentList: PaymentIProps[] = await response.json();
	const data: LoanIProps = await getUser(username);
	let indexPaymentString: string[] = ["0"];
	const result = paymentList.forEach((item) => indexPaymentString.push(item.amount));
	let indexPayment = indexPaymentString.map(Number);
	const Amount = indexPayment.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	return `${Amount}`;


}


async function BorrowersList(params: RequestParams) {
	const { branchName, teamLeaderName, teamLeaderAddress, teamLeaderOccupation, teamLeaderPhone, teamLeaderPhotoUrl, photoUrl, presidentAddress, presidentName, presidentOccupation, presidentPhone, SecretaryAddress, SecretaryName, SecretaryOccupation, SecretaryPhone, ImamAddress, ImamName, ImamOccupation, ImamPhone, username } = params.response.info;
	const loanList: LoanIProps[] = params.response.loanList.slice(0, 5);

	unstable_noStore();
	const branch = await getBorrowersByBranch(username);
	const TotalBranch = await getSearchBorrowersByBranch(params.page, username);
	return (
		<div className='p-2'>
			<Accordion type="single" className='py-1' collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className='text-lg font-medium text-color-main'>ঋণ গ্রহীতার লিস্ট</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-2">
							<h2 className="text-base font-medium text-center">{branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট</h2>
							<div className='flex flex-col'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>CODE</TableHead>
											<TableHead className='w-[300px]'>BORROWERS NAME</TableHead>
											<TableHead>BALANCE</TableHead>
											<TableHead>RECOVERED</TableHead>
											<TableHead>DISBURSED</TableHead>
											<TableHead>DETAILS</TableHead>
										</TableRow>
									</TableHeader>
									<Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
										<TableBody>
											{
												TotalBranch?.map((item, index: number) => (
													<TableRow key={index}>
														<TableCell className="font-medium">{item.code}</TableCell>
														<TableCell className="font-medium uppercase">{item.name}</TableCell>
														<TableCell className="font-medium uppercase" >{duePayment(item.username)}</TableCell>
														<TableCell className="font-medium uppercase">{allPayment(item.username)}</TableCell>
														<TableCell className="font-medium uppercase">{item.balance}</TableCell>
														<TableCell className="font-medium uppercase">
															<Button className='bg-color-sub' size={"sm"} asChild>
																<Link href={`/karze-hasana/borrowers/${item.username}`}>DETAILS</Link>
															</Button>

														</TableCell>
													</TableRow>
												))
											}
										</TableBody>
									</Suspense>
								</Table>
								<div className="flex justify-center py-2">
									<PaginationPart item={5} data={branch.length} />
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" className='py-1' collapsible>
				<AccordionItem value="item-2">
					<AccordionTrigger className='text-lg font-medium text-color-main'>ম্যানেজমেন্ট টিম</AccordionTrigger>
					<AccordionContent>
						<div className="">
							<h2 className="text-base font-medium text-center">{branchName} এর ম্যানেজমেন্ট টিম</h2>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-3">
									<AccordionTrigger className='text-lg font-medium text-color-main'>টিম লিডার</AccordionTrigger>
									<AccordionContent>
										<div className="flex md:flex-row flex-col gap-1">
											<div className="md:basis-9/12 w-full border-[2px] rounded py-1 md:px-4 px-2 flex flex-col justify-around">
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{teamLeaderName}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{teamLeaderPhone}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{teamLeaderAddress}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{teamLeaderOccupation}</h2>
											</div>

											<div className="md:basis-3/12 w-full border-[2px]  flex justify-around rounded">
												<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover rounded' src={teamLeaderPhotoUrl} alt={teamLeaderName} width={260} height={140} />
											</div>

										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<MemberList username={username} />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" className='py-1' collapsible>
				<AccordionItem value="item-4">
					<AccordionTrigger className='text-lg font-medium text-color-main'>মসজিদ কমিটি</AccordionTrigger>
					<AccordionContent>
						<div className="">
							<h2 className="text-base font-medium text-center">{branchName} এর মসজিদ কমিটি</h2>
							<Accordion type="single" className='px-5' collapsible>
								<AccordionItem className='py-2' value="item-5">
									<AccordionTrigger className='px-2 text-lg font-medium text-color-main'> ইমাম</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded py-1 px-4 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{ImamName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{ImamPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{ImamAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{ImamOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem className='py-2' value="item-6">
									<AccordionTrigger className='px-2 text-lg font-medium text-color-main'> সভাপতি</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded py-1 px-4 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{presidentName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{presidentPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{presidentAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{presidentOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem className='py-2' value="item-7">
									<AccordionTrigger className='px-2 text-lg font-medium text-color-main'> সেক্রেটারি</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded py-1 px-4 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{SecretaryName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{SecretaryPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{SecretaryAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{SecretaryOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" className='py-1' collapsible>
				<AccordionItem value="item-8">
					<AccordionTrigger className='text-lg font-medium text-color-main'>মসজিদের ছবি</AccordionTrigger>
					<AccordionContent>
						<div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-1 md:p-2 p-1 justify-items-center">
							{
								photoUrl.map((item, index) => (
									<div key={index} >
										<Dialog>
											<DialogTrigger><Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg" alt='mosjid' src={item} width={300} height={120} /></DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded " alt='mosjid' src={item} width={500} height={220} />
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</div>
								))
							}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default BorrowersList