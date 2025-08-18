"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import Link from "next/link"
import { UploadButton } from "@/lib/uploading"
import toast from "react-hot-toast"
import { ChildIProps, DonateProps, SponsorProps } from "@/types"


const formSchema = z.object({
	amount: z.string(),
	email: z.string(),
	name: z.string(),
	about: z.string().optional(),
	method: z.string().optional(),
});


function ChildDonation({ item }: { item: ChildIProps }) {
	const router = useRouter();
	const [image, setImage] = useState<string | undefined>("");
	const [paymentType, setPaymentType] = useState<string>("");

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setPaymentType(selectedValue)
	};

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ name, email, amount, photoUrl, method, about, username }: SponsorProps) => {
			const response = await axios.post("/api/sponsor-child", {
				name, email, amount, photoUrl, about, method, username
			});
			return response.data;
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		const amount = values.amount;
		const name = values.name;
		const email = values.email;
		const method = values.method;
		const about = values.about;
		const photoUrl = image;
		const username = item.username;


		mutate({ name, email, amount, photoUrl, about, method, username }, {
			onSuccess: (data: SponsorProps) => {
				if (data?.id) {
					toast.success("Donate Successfully");
				} else {
					throw new Error("Donate Failed");
				}
				router.push(`/sponsor-a-child`);
			},
			onError: (error) => {
				toast.error("Donate Failed");
			}
		});
	};
	// console.log(state, stateBranch);

	return (
		<>
			<div className='rounded'>
				<div className="flex flex-col">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
							<div className=" grid grid-cols-1 items-center gap-[2px]">
								<div className="rounded">
									<label htmlFor="paymentType" className="block mb-1 font-medium">
										Payment From:
									</label>
									<select
										id="paymentType"
										value={paymentType}
										onChange={handleTypeChange}
										className="w-full border rounded px-1 py-[1px] cursor-pointer"
									>
										<option value="">Select a payment From</option>
										<option value="bangladesh">Bangladesh</option>
										<option value="outside">OutSide Bangladesh</option>
									</select>
								</div>
								{
									paymentType === "bangladesh" && < div className="p-[2px]">
										<h2 className="text-[14px] font-medium">Please send your donation to the given bKash or bank accounts bellow.</h2>
										<h2 className="text-[14px]"> <span className="font-bold">bKash A/C Number:</span> 01738115411 (Send Money)</h2>
										<h2 className="py-1 font-bold">Islami Bank Bangladesh Ltd</h2>
										<p className=" text-sm">
											A/C Number: 20501130203541208
											<br />
											A/C Name: Abdullah Al Mamun
											<br />
											Branch Name: Rajshahi
											<br />
											Routing Number: 125811932
											<br />
											SWIFT Code: IBBLBDDH113
										</p>
									</div>
								}
								{
									paymentType === "outside" && <div className="">
										<p className=" text-[15px] font-medium">বাংলাদেশের বাইরে থেকে অর্থ প্রদানের জন্য আমরা buymeacoffe তে একটা ফান্ডরেইজিং করেছি। আপনি এখানে Credit or debit card ব্যবহার করে আমাদেরকে অনুদান পাঠাতে পারবেন(স্ট্রাইপ দ্বারা সুরক্ষিত)।</p>
										<Button asChild className="bg-green-600 py-4 px-4 hover:bg-color-sub text-white w-full text-lg">
											<Link prefetch={false} href="https://www.buymeacoffee.com/arafatfoundation/e/204578">Donate on Buy Me A Coffe</Link>
										</Button>
									</div>
								}
								<h2 className="text-[13px] font-medium text-color-main">আপনার অনুদানের তথ্যগুলো দিয়ে সহযোগিতা করুন।</h2>
								<div className=" grid grid-cols-2 gap-2">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input className="bg-white" placeholder="Name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input className="bg-white" placeholder="email" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="amount"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Amount</FormLabel>
												<FormControl>
													<Input className="bg-white" type="number" placeholder=" Amount" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{
										paymentType === 'bangladesh' && <FormField
											control={form.control}
											name="method"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Payment Method</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl className="bg-white">
															<SelectTrigger>
																<SelectValue placeholder="Select a verified type" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="bank">Bank</SelectItem>
															<SelectItem value="mobileBanking">Mobile Banking</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									}
									{
										paymentType === "outside"
										&& <div className="flex flex-col items-center  gap-2 py-2">
											<UploadButton
												className="ut-button:bg-color-sub   flex items-center w-[350px] ut-button:ut-readying:bg-color-sub/80"
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
										</div>}
								</div>
								<FormField
									control={form.control}
									name="about"
									render={({ field }) => (
										<FormItem>
											<FormLabel>About</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell us a little bit about"
													className="resize-none bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

							</div>
							{
								paymentType === "" || isPending ? <Button disabled>Loading...</Button> : <Button type="submit">Submit</Button>
							}
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default ChildDonation;