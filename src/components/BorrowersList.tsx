import React, { Suspense } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { BranchIProps, LoanIProps } from '@/types';
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


interface RequestParams {
	response: {
		info: BranchIProps,
		loanList: LoanIProps[],
	}
};




async function BorrowersList(params: RequestParams) {
	const { branchName, teamLeaderName, teamLeaderAddress, teamLeaderOccupation, teamLeaderPhone, teamLeaderPhotoUrl, photoUrl, presidentAddress, presidentName, presidentOccupation, presidentPhone, SecretaryAddress, SecretaryName, SecretaryOccupation, SecretaryPhone, ImamAddress, ImamName, ImamOccupation, ImamPhone } = params.response.info;
	const loanList: LoanIProps[] = params.response.loanList;
	return (
		<div className='p-2'>
			<Accordion type="single" className='py-1' collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className='text-lg font-medium text-color-main'>Borrowers List</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-2">
							<h2 className="text-base font-medium text-center">{branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট</h2>
							<div className='flex flex-col'>
								<div className="px-4 py-2 flex justify-end">
									<Input className='w-64' type="text" placeholder="Search" />
								</div>
								<Table>
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
										<TableBody>
											{
												loanList.map((item, index: number) => (
													<TableRow key={index}>
														<TableCell className="font-medium">{item.code}</TableCell>
														<TableCell className="font-medium uppercase">{item.name}</TableCell>
														<TableCell className="font-medium uppercase" >{item.disbursed}</TableCell>
														<TableCell className="font-medium uppercase">{item.recovered}</TableCell>
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
							<h2 className="text-base font-medium text-center">{branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট</h2>
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
												<Image className='object-cover rounded' src={teamLeaderPhotoUrl} alt={teamLeaderName} width={260} height={140} />
											</div>

										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
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
											<DialogTrigger><Image className="rounded-lg" alt='mosjid' src={item} width={300} height={120} /></DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<Image className="object-cover rounded " alt='mosjid' src={item} width={500} height={220} />
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