"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
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
import { uploadImage } from '@/lib/ImageUpload'


const FormSchema = z.object({
	method: z.string(),
	amount: z.string(),
});

const initialState = {
	photoUrl: "",
	message: "",
	error: false
};



function PaymentRequest() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),

	});

	const [state, formAction] = useFormState(uploadImage, initialState);
	const { pending } = useFormStatus();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log({ data });
	}
	return (
		<div className="py-2">
			<Dialog>
				<DialogTrigger><Button variant="outline" className="bg-color-main">Payment Request</Button></DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className='text-center text-color-main'>Payment Request</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						{
							pending ? <p className=' text-center text-color-main'>Uploading...</p> :
								<>
									<form action={formAction} className='flex flex-row gap-1'>
										<input type="file" name="image" id="image" accept='images/*' />
										<Button type="submit" disabled={pending}>Submit</Button>
									</form>
								</>
						}
						{
							state.photoUrl.length > 5 ? <p className='text-center text-color-main'>Image Uploaded</p> : " No Upload"
						}
						{
							state.error === true && <p className='text-center text-color-sub'>Image Uploaded failed</p>
						}
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input type='number' placeholder="amount" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="method"
									render={({ field }) => (
										<FormItem>
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
								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>

		</div>
	)
}

export default PaymentRequest