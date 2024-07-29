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
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SearchIExProps } from '@/types';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';


async function htmlConvert(data: string) {
    const jsonAndHtml = data.split("^");
    const html = jsonAndHtml[0];
    return (
        <div className="py-2">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}



function ExpensesDetails() {
    const [date, setDate] = React.useState<Date>()
    const [page, setPage] = React.useState<string>("1");
    const [expenses, setExpenses] = React.useState([]);

    const pathname = usePathname();


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
        <div className="md:mx-20 md:my-4 my-2 text-center">
            <div className="my-4 flex justify-center mx-2">
                <h2 className=" font-medium md:text-2xl text-lg border-dashed border-2 border-indigo-600 rounded px-2 ">আমাদের আয় এবং ব্যায়ের হিসাব সমূহ</h2>
            </div>
            <div>
                <h3 className=" text-base mb-4 text-color-main font-medium">প্রিয় “ভাই/বোন” আপনার অনুদান আমাদের কাছে আমানত। আমাদের কাছে অনুদান পাঠানোর ২৪ ঘন্টার মধ্যে নিচের লিস্ট/
                    <Link className=' text-green-500 mx-1' href="/details-of-income">Income</Link>
                    আপনার অনুদান
                    জমা হয়েছে কি না সেটি চেক করার অনুরোধ রইলো । আপনার অনুদানটি এখানে জমা না হলে আমাদের সাথে  <Link className=' text-green-500' href="/contact-us">যোগাযোগ করুন</Link> ।
                </h3>
                <h3 className="mt-2  text-base text-color-main font-medium">আপনি যদি নির্দিষ্ট কোনো কাজ/প্রজেক্টের জন্য আমাদেরকে অনুদান দিয়ে থাকেন তবুও নিচের লিস্ট/<Link className=' text-green-500 mx-1' href="/details-of-expenses">Expenses</Link> থেকে নির্দিষ্ট কাজে এবং নির্দিষ্ট দিনে খরচ
                    করা হয়েছে কি না সেটা চেক করার অনুরোধ রইলো ।
                </h3>
                <div className="flex flex-row gap-2 justify-start mx-2">
                    <Link href="/details-of-expenses"><h2 className={`text-2xl font-bold ${pathname === "/details-of-expenses" ? " text-color-sub" : " text-color-main"}`}>Expenses</h2></Link>
                    <h2 className=' text-2xl text-color-main font-bold'>|</h2>
                    <Link href="/details-of-income">
                        <h2 className={`text-2xl font-bold ${pathname === "/details-of-income" ? " text-color-sub" : " text-color-main"}`}>Income</h2></Link>
                </div>
            </div>
            <div className='flex flex-col my-3 border-2 py-2 px-1 rounded-sm'>
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
                            <TableHead className=' uppercase text-center'>DATE</TableHead>
                            <TableHead className=' uppercase text-center '>Amount</TableHead>
                            <TableHead className=' uppercase text-center'>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Suspense fallback={<h2 className=' text-center p-4'>Loading...</h2>} >
                        <TableBody>
                            {
                                expenses?.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{`${moment(item?.date).format('DD/MM/YYYY')}`}</TableCell>
                                        <TableCell className="font-medium uppercase">{item.amount}</TableCell>
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
                        </TableBody>
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