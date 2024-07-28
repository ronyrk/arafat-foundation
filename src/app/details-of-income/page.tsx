"use client";
import React, { Suspense } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import moment from 'moment';
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { DateFormateConvert } from "@/lib/formateDateConvert"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IncomeIProps, SearchIProps } from '@/types';
import toast from 'react-hot-toast';
import { FormLabel } from '@/components/ui/form';




function TableIncome() {

	const [start, setStartDate] = React.useState<Date>()
	const [end, setEndDate] = React.useState<Date>()
	const [transaction, setTransaction] = React.useState("");
	const [page, setPage] = React.useState<string>("1");
	const [income, setIncome] = React.useState([]);




	const { mutate, isPending } = useMutation({
		mutationFn: async ({ start, end, transaction, page }: SearchIProps) => {
			const response = await axios.get(`/api/income-search?from=${start == undefined ? "u" : start}&to=${end == undefined ? "u" : end}&transaction=${transaction}&page=${page}`);
			return response.data;
		},
	});

	React.useEffect(() => {
		mutate({ start, end, page, transaction }, {
			onSuccess: (data) => {
				toast.success(" Successfully Updated");
				setIncome(data);
			},
			onError: (error) => {
				toast.error("Updated Failed");
			}
		});
	}, [start, end, mutate, transaction, page]);

	function GetIncome(data: IncomeIProps[]) {
		const Amount: number[] = [];
		const income = data?.forEach((item) => Amount.push(Number(item.amount)));
		const sum = Amount?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
		return `${sum}`;
	}
	return (
		<div className="md:mx-20 md:my-4 my-2">
			<div className='flex flex-col'>
				<h2 className="text-center text-xl">Income List</h2>
				<div className=" flex flex-row gap-3  justify-between items-center p-2">
					<div className=' flex flex-col gap-1'>
						<h2 className=" text-base">From</h2>
						<Popover>
							<PopoverTrigger asChild>
								<Button

									className={cn(
										"w-[200px] text-white justify-start text-left font-normal",
										!start && "text-muted-foreground  text-white"
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{start ? format(start, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									onSelect={setStartDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className=' flex flex-col gap-1'>
						<h2 className=" text-base">To</h2>
						<Popover>
							<PopoverTrigger asChild>
								<Button

									className={cn(
										"w-[200px] text-white justify-start text-left font-normal",
										!end && "text-muted-foreground  text-white"
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{end ? format(end, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									onSelect={setEndDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="">
						<h2 className=' flex flex-col gap-1'>Transaction</h2>
						<Input className='w-64' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransaction(e.target.value)} placeholder="Search" />
					</div>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>DATE</TableHead>
							<TableHead className=' uppercase'>Amount</TableHead>
							<TableHead className=' uppercase'>Payment Method</TableHead>
							<TableHead className=' uppercase'>Transaction ID</TableHead>
						</TableRow>
					</TableHeader>
					<Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
						<TableBody>
							{/* {
								income?.map((item: any, index: number) => (
									<TableRow key={index}>
										<TableCell className="font-medium">{`${moment(item?.date).format('DD/MM/YYYY')}`}</TableCell>
										<TableCell className="font-medium uppercase">{item.amount}</TableCell>
										<TableCell className="font-medium uppercase">{item.type}</TableCell>
										<TableCell className="font-medium uppercase">{item.transaction}</TableCell>
									</TableRow>
								))
							} */}
							{/* <TableRow className=''>
								<TableCell className=" font-bold uppercase">Total</TableCell>
								<TableCell className="font-bold uppercase">{GetIncome(income)}</TableCell>
							</TableRow> */}
						</TableBody>
					</Suspense>
				</Table>
				{/* <div className="flex justify-center py-4">
					<div className=' flex flex-row gap-2'>
						{
							Array.from({ length: Math.ceil(income.length / 20) })?.map((i: any, index) => (
								<Button variant="outline" aria-disabled={Number(page) === index + 1} className={`text-black ${Number(page) === index + 1 ? "bg-color-sub" : ""}`} key={index}
									onClick={() => setPage(`${index + 1}`)}
								>
									{1 + index}
								</Button>

							))
						}
					</div >
				</div> */}
			</div>
		</div>
	)
}

export default TableIncome