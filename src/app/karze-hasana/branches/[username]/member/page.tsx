"use client";
import React, { useState } from 'react'
import { z } from 'zod';
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MemberIProps, ParamsIProps } from '@/types';
import { UploadButton } from '@/lib/uploading';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



const FormSchema = z.object({
	teamMemberName: z.string(),
	teamMemberPhone: z.string(),
	teamMemberAddress: z.string(),
	teamMemberOccupation: z.string(),
});

function MemberCreate({ params }: ParamsIProps) {
	const router = useRouter();
	const [image, setImage] = useState<string | undefined>("")
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),

	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ branch, teamMemberAddress, teamMemberName, teamMemberOccupation, teamMemberPhone, teamMemberPhotoUrl }: MemberIProps) => {
			const response = await axios.post("/api/member", {
				branch, teamMemberAddress, teamMemberName, teamMemberOccupation, teamMemberPhone, teamMemberPhotoUrl
			});
			return response.data;
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const teamMemberOccupation = data.teamMemberOccupation;
		const teamMemberAddress = data.teamMemberAddress;
		const teamMemberPhone = data.teamMemberPhone;
		const teamMemberName = data.teamMemberName;
		const teamMemberPhotoUrl = image as string;
		const branch = params.username;

		// Send Payload User Created
		mutate({ branch, teamMemberAddress, teamMemberName, teamMemberOccupation, teamMemberPhone, teamMemberPhotoUrl }, {
			onSuccess: ({ message, user }: { message: string, user: MemberIProps }) => {
				// console.log(message, payment, "output");
				if (user?.id) {
					toast.success(message);
					router.push(`/karze-hasana/branches/${branch}`);
				} else {
					toast.error("User Request Created Failed");
				}
			},
			onError: (error) => {
				toast.error("User Request Created Failed");
			}
		});

	};
	return (
		<div className='py-4 flex flex-col gap-1'>
			<h2 className=" text-xl text-center text-color-main">Member Add</h2>
			<div className="flex flex-col items-center gap-1 md:px-4 px-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

						<div className="flex flex-col gap-2">
							<Label >Picture</Label>
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
							name="teamMemberName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input className='w-[350px]' placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamMemberAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input className='w-[350px]' placeholder="address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamMemberPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input className='w-[350px]' placeholder="phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamMemberOccupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Occupation</FormLabel>
									<FormControl>
										<Input className='w-[350px]' placeholder="Occupation" {...field} />
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

export default MemberCreate