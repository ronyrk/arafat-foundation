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
import { ChangeEvent, useState } from "react"
import { Textarea } from "./ui/textarea"
import Link from "next/link"
import { UploadButton } from "@/lib/uploading"
import toast from "react-hot-toast"
import { DonateProps, ProjectsProps } from "@/types"


const formSchema = z.object({
	amount: z.string(),
	email: z.string(),
	name: z.string(),
	about: z.string().optional(),
	sendNumber: z.string().optional(),
	transactionId: z.string().optional(),
});


function ProjectDonation({ data }: { data: ProjectsProps }) {
	const router = useRouter();
	const [image, setImage] = useState<string | undefined>("");
	const [paymentType, setPaymentType] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<string>('');

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setPaymentType(selectedValue)
	};

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	// const { mutate, isPending } = useMutation({
	// 	mutationFn: async ({ name, email, amount, photoUrl, method, about }: DonateProps) => {
	// 		const response = await axios.post("/api/donate", {
	// 			name, email, amount, photoUrl, about, method
	// 		});
	// 		return response.data;
	// 	},
	// });

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		const amount = values.amount;
		const name = values.name;
		const email = values.email;
		const method = "";
		const about = values.about;
		const photoUrl = image;


		// mutate({ name, email, amount, photoUrl, about, method }, {
		// 	onSuccess: (data: DonateProps) => {
		// 		if (data?.id) {
		// 			toast.success("Donate Successfully");
		// 		} else {
		// 			throw new Error("Donate Failed")
		// 		}
		// 		router.push(`/our-projects`);
		// 	},
		// 	onError: (error) => {
		// 		toast.error("Donate Failed");
		// 	}
		// });
	};
	// console.log(state, stateBranch);

	return (
		<>
			<div className=' bg-gray-200 rounded p-2'>
				<h2 className="text-xl font-medium py-1">{data.title}</h2>
				<p className="text-sm  font-medium pr-1 leading-relaxed">{data.shortDes}</p>

				<div className="flex flex-col gap-1">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<div className=" grid grid-cols-1 items-center gap-1">
								<div className="rounded">
									<div className="p-4 flex flex-col gap-2">
										<h2 className="my-2 font-medium text-xl">Payment From:</h2>
										<label>
											<input
												type="radio"
												name="radioGroup" // Group both radio buttons together
												className=" text-2xl"
												value="bangladesh"
												checked={selectedOption === "bangladesh"}
												onChange={handleOptionChange}
												placeholder="Bangladesh"
											/>
											<span className="px-4 text-lg">Bangladesh</span>
										</label>

										<label>
											<input
												type="radio"
												name="radioGroup" // Group both radio buttons together
												value="outside"
												checked={selectedOption === "outside"}
												onChange={handleOptionChange}
											/>
											<span className="px-4 text-lg">OutSide Bangladesh</span>
										</label>

									</div>
								</div>

								{
									selectedOption && <FormField
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
								}
								{
									selectedOption && <FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email or Phone</FormLabel>
												<FormControl>
													<Input className="bg-white" placeholder="email or Phone" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								}
								{
									selectedOption && <FormField
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
								}
								{
									selectedOption === 'bangladesh' && <div className=" rounded">
										<label htmlFor="paymentType" className="block mb-1 font-medium">
											Payment Method:-
										</label>
										<select
											id="paymentType"
											value={paymentType}
											onChange={handleTypeChange}
											className="w-full border rounded px-1 py-[1px] cursor-pointer"
										>
											<option value="">Select a payment Method</option>
											<option value="mobile-banking">Mobile Banking</option>
											<option value="bank-transfer">Bank Transfer</option>
										</select>
									</div>
								}

								{
									paymentType === "mobile-banking" && <FormField
										control={form.control}
										name="sendNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Sender Number</FormLabel>
												<FormControl>
													<Input className="bg-white" placeholder=" Phone" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								}
								{
									paymentType === "mobile-banking" && <FormField
										control={form.control}
										name="transactionId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Transaction ID</FormLabel>
												<FormControl>
													<Input className="bg-white" placeholder=" Transaction ID" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								}
								{
									selectedOption === "outside"
									&& <div className="flex flex-row py-2">
										<h2 className="text-lg font-medium">File:-</h2>
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
								}
								{
									paymentType === "bank-transfer"
									&& <div className="flex flex-row py-2">
										<h2 className="text-lg font-medium">File:-</h2>
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
									</div>}

								{
									selectedOption && <FormField
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
								}

							</div>
							{
								selectedOption === "" || paymentType === "" ? "" : <Button type="submit">Submit</Button>
							}
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default ProjectDonation;