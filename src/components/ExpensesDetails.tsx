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
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import moment from 'moment';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DonorIProps, ExpensesIProps, SearchIExProps } from '@/types';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';


function htmlConvert(data: string) {
    const jsonAndHtml = data.split("^");
    const html = jsonAndHtml[0];
    return (
        <div className="py-2">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}


function GetExpenses(data: ExpensesIProps[]) {
    const Amount: number[] = [];
    const income = data?.forEach((item) => Amount.push(Number(item.amount)));
    const sum = Amount?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return `BDT=${sum} /=`;
}



function ExpensesDetails() {
    const [date, setDate] = React.useState<Date>()
    const [page, setPage] = React.useState<string>("1");
    const [expenses, setExpenses] = React.useState([]);



    const { mutate, isPending } = useMutation({
        mutationFn: async ({ date, page }: SearchIExProps) => {
            const response = await axios.get(`/api/expenses?from=${date == undefined ? "udd" : date}&page=${page}`);
            return response.data;
        },
    });

    React.useEffect(() => {
        mutate({ date, page }, {
            onSuccess: (data) => {
                setExpenses(data);
            },
            onError: (error) => {
                toast.error("Updated Failed");
            }
        });
    }, [date, mutate, page]);


    return (
        <div className="my-2">
            <div className='flex flex-col my-3  py-2 px-1 rounded-sm'>
                <h2 className="text-center text-2xl font-semibold text-color-main">Details of  Expenses</h2>
                <div className="p-2 flex justify-between ">
                    <div className="grid gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button

                                    className={cn(
                                        "w-[200px] text-white justify-start text-left font-normal",
                                        !date && "text-muted-foreground  text-white"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=' uppercase '>DATE</TableHead>
                            <TableHead className=' uppercase  '>Amount</TableHead>
                            <TableHead className=' uppercase'>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
                        {
                            isPending ? <h2>Loading...</h2> :
                                <TableBody>
                                    {
                                        expenses?.map((item: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{`${moment(item?.date).format('DD/MM/YYYY')}`}</TableCell>
                                                <TableCell className="font-medium uppercase">BDT={item.amount} /=</TableCell>
                                                <TableCell className="font-medium uppercase">
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <Button className='bg-color-sub' size={"sm"}>
                                                                Details
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className='p-8 bg-white'>
                                                            <DialogHeader>
                                                                <h2 className=' text-2xl text-bold text-color-main text-center'>Details</h2>
                                                            </DialogHeader>
                                                            <DialogDescription>
                                                                {
                                                                    htmlConvert(item.description)
                                                                }
                                                            </DialogDescription>

                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow className=''>
                                        <TableCell className=" font-bold uppercase">Total</TableCell>
                                        <TableCell className="font-bold uppercase">{GetExpenses(expenses)}</TableCell>
                                    </TableRow>
                                </TableBody>
                        }
                    </Suspense>
                </Table>
                <div className="flex justify-center py-4">
                    <div className=' flex flex-row gap-2'>
                        {
                            Array.from({ length: Math.ceil(expenses.length / 20) })?.map((i: any, index) => (
                                <Button variant="outline" aria-disabled={Number(page) === index + 1} className={`text-black ${Number(page) === index + 1 ? "bg-color-sub" : ""}`} key={index}
                                    onClick={() => setPage(`${index + 1}`)}
                                >
                                    {1 + index}
                                </Button>

                            ))
                        }
                    </div >
                </div>
            </div>
        </div>
    )
}

export default ExpensesDetails