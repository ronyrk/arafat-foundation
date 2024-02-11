import { LoanIProps } from '@/types'
import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog"
import { View } from 'lucide-react';
import Image from 'next/image';




function BorrowersDocuments(params: any) {
	const data: LoanIProps = params.data;
	const { nidback, nidfont, form1, form2 } = data;
	return (
		<div className=" basis-4/12 border-[2px] rounded px-3 py-1 flex flex-col justify-around">
			<h2 className=" font-semibold text-xl py-2 text-color-main">Borrowers Documents</h2>
			<div className="px-4">
				<div className=" flex flex-row justify-between items-center">
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">Application Form 1 </h2>
					<button>
						<Dialog>
							<DialogTrigger><View /></DialogTrigger>
							<DialogContent>
								<Image src={form1} alt="application from" className='rounded object-cover flex justify-center' width={400} height={240} />
							</DialogContent>
						</Dialog>
					</button>
				</div>
				<div className=" flex flex-row justify-between items-center">
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">Application Form 2 </h2>
					<button>
						<Dialog>
							<DialogTrigger><View /></DialogTrigger>
							<DialogContent>
								<Image src={form2} alt="application from" className='rounded object-cover flex justify-center' width={400} height={240} />
							</DialogContent>
						</Dialog>
					</button>
				</div>
				<div className="flex flex-row justify-between items-center">
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">NID Font</h2>
					<button>
						<Dialog>
							<DialogTrigger><View /></DialogTrigger>
							<DialogContent>
								<Image src={nidfont} alt="nid font" className='rounded object-cover' width={400} height={240} />
							</DialogContent>
						</Dialog>
					</button>
				</div>
				<div className="flex flex-row justify-between items-center">
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">NID Back</h2>
					<button>
						<Dialog>
							<DialogTrigger><View /></DialogTrigger>
							<DialogContent>
								<Image src={nidback} alt="nid back" className='rounded object-cover' width={400} height={240} />
							</DialogContent>
						</Dialog>
					</button>
				</div>
			</div>
		</div>
	)
}

export default BorrowersDocuments