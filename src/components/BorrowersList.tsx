import React from 'react'
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


interface RequestParams {
	response: {
		info: BranchIProps,
		loanList: LoanIProps[],
	}
};




function BorrowersList(params: RequestParams) {
	const { branchName, teamLeaderName, teamLeaderAddress, teamLeaderOccupation, teamLeaderPhone, teamLeaderPhotoUrl, photoUrl } = params.response.info;
	return (
		<div>
			<Accordion type="single" className='py-2' collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className='text-lg font-medium text-color-main'>Borrowers List</AccordionTrigger>
					<AccordionContent>
						<div className="">
							<h2 className="text-base font-medium text-center">{branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট</h2>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" className='py-2' collapsible>
				<AccordionItem value="item-2">
					<AccordionTrigger className='text-lg font-medium text-color-main'>ম্যানেজমেন্ট টিম</AccordionTrigger>
					<AccordionContent>
						<div className="">
							<h2 className="text-base font-medium text-center">{branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট</h2>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-3">
									<AccordionTrigger className='text-lg font-medium text-color-main'>টিম লিডার</AccordionTrigger>
									<AccordionContent>
										<div className="flex flex-row gap-1">
											<div className="basis-9/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{teamLeaderName}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{teamLeaderPhone}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{teamLeaderAddress}</h2>
												<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{teamLeaderOccupation}</h2>
											</div>

											<div className="basis-3/12 border-[2px] p-2 flex justify-around rounded">
												<Image className='object-cover rounded-md ' src={teamLeaderPhotoUrl} alt={teamLeaderName} width={260} height={140} />
											</div>

										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-4">
					<AccordionTrigger className='text-lg font-medium text-color-main'>মসজিদ কমিটি</AccordionTrigger>
					<AccordionContent>
						<div className="">
							<h2 className="text-base font-medium text-center">{branchName} এর মসজিদ কমিটি</h2>
							<Accordion type="single" collapsible>
								<AccordionItem className='px-4' value="item-5">
									<AccordionTrigger className='text-lg font-medium text-color-main'> ইমাম</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded p-1 px-2 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{teamLeaderName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{teamLeaderPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{teamLeaderAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{teamLeaderOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem className='px-4' value="item-6">
									<AccordionTrigger className='text-lg font-medium text-color-main'> সভাপতি</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded p-1 px-2 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{teamLeaderName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{teamLeaderPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{teamLeaderAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{teamLeaderOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem className='px-4' value="item-7">
									<AccordionTrigger className='text-lg font-medium text-color-main'> সেক্রেটারি</AccordionTrigger>
									<AccordionContent>
										<div className="border-[2px] rounded p-1 px-2 flex flex-col justify-around">
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">নাম:</span>{teamLeaderName}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ফোন :</span>{teamLeaderPhone}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">ঠিকানা :</span>{teamLeaderAddress}</h2>
											<h2 className=" font-normal text-[15px]  text-color-main"><span className="mr-2 font-semibold">পেশা:</span>{teamLeaderOccupation}</h2>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-8">
					<AccordionTrigger className='text-lg font-medium text-color-main'>মসজিদের ছবি</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-4 gap-4 p-2 justify-items-center">
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