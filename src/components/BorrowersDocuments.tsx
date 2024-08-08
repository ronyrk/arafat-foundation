"use client";
import { LoanIProps } from '@/types'
import React, { Suspense } from 'react'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog"
import { View } from 'lucide-react';
import Image from 'next/image';
import { useUser } from './ContextProvider';
import FormTwo from "../../public/form-one-part.png"
import FormOne from "../../public/form-part-two.png"
import nidFont from "../../public/nid-font.png"
import nidBack from "../../public/nid-back.png"




function BorrowersDocuments(params: any) {
	const data: LoanIProps = params.data;
	const { nidback, nidfont, form1, form2 } = data;
	const { user, isUserLoading } = useUser();
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
								<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
									{
										user?.email ? <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={form1} alt="application from" className=' object-cover rounded ' width={450} height={200} /> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={FormOne} placeholder='blur' alt="application from" className='rounded object-fill' width={500} height={240} />
									}
								</Suspense>
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
								<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
									{
										user?.email ? <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={form2} alt="application from" className=' object-fill rounded ' width={450} height={200} /> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={FormTwo} placeholder='blur' alt="application from" className='rounded object-fill' width={500} height={240} />
									}
								</Suspense>
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
								<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
									{
										user?.email ? <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={nidfont} alt="application from" className='rounded  object-fill' width={450} height={200} /> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={nidFont} placeholder='blur' alt="application from" className='rounded object-fill' width={500} height={240} />
									}
								</Suspense>
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
								<Suspense fallback={<h2 className='text-center'>Loading...</h2>}>
									{
										user?.email ? <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={nidback} alt="application from" className='rounded object-fill ' width={450} height={200} /> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={nidBack} placeholder='blur' alt="application from" className='rounded object-fill' width={500} height={240} />
									}
								</Suspense>
							</DialogContent>
						</Dialog>
					</button>
				</div>
			</div>
		</div >
	)
}

export default BorrowersDocuments