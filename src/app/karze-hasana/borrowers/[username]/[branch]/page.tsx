"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useFormState, useFormStatus } from 'react-dom'
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PaymentIProps } from '@/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { UploadButton } from '@/lib/uploading';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const FormSchema = z.object({
	method: z.string(),
	amount: z.string(),
	date: z.date({
		required_error: "A date is required.",
	}),
});

function Payment({ params }: {
	params: { username: string, branch: string }
}) {

	const { username, branch } = params;

	const [image, setImage] = useState<string | undefined>("")


	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),

	});
	// Payment Request
	const { mutate, isPending } = useMutation({
		mutationFn: async ({ loanusername, amount, photoUrl, method, createAt }: PaymentIProps) => {
			const response = await axios.post("/api/requestPayment", {
				loanusername, method, amount, photoUrl, createAt
			});
			return response.data;
		},
	});


	function onSubmit(data: z.infer<typeof FormSchema>) {
		const photoUrl = image as string;
		const amount = data.amount;
		const method = data.method;
		const loanusername = username;
		const previous = data.date;
		const createAt = new Date(previous);
		createAt.setDate(previous.getDate() + 1);

		// Send Payload payment Request
		mutate({ loanusername, photoUrl, amount, method, createAt }, {
			onSuccess: ({ message, payment }: { message: string, payment: PaymentIProps }) => {
				// console.log(message, payment, "output");
				if (payment.id) {
					toast.success(message);
					router.push(`/karze-hasana/borrowers/${username}`);
				} else {
					toast.error("payment Request Created Failed");
				}
			},
			onError: (error) => {
				toast.error("payment Request Created Failed");
			}
		});

	};

	return (
		<div className='py-4 flex flex-col gap-2'>
			<h2 className=" text-xl text-center text-color-main">Payment Request</h2>
			<div className="flex flex-col items-center gap-1 md:px-4 px-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col w-[350px]">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"text-color-main pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-2">
							<Label >Payment Transaction photo</Label>
							<UploadButton
								className="ut-button:bg-color-sub  w-[350px] ut-button:ut-readying:bg-color-sub/80"
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									// Do something with the response
									setImage(res[0].url);
									toast.success("Image Upload successfully")
								}}
								onUploadError={(error: Error) => {
									// Do something with the error.
									toast.error(error.message);
								}}
							/>
						</div>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input type='number' className='w-[350px]' placeholder="amount" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormItem className='w-[350px]'>
									<FormLabel>method</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a verified method" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="bkash">Bkash</SelectItem>
												<SelectItem value="nagad">Nagad</SelectItem>
												<SelectItem value="bank">Bank</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{isPending ? <Button disabled>Loading...</Button> : <Button disabled={image === ''} type="submit">Submit</Button>}
					</form>
				</Form>
			</div>
		</div>
	)
}

export default Payment