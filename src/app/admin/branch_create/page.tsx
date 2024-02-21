"use client"

import { string, z } from "zod"
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
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"
import { uploadImage } from "@/lib/ImageUpload"
import { uploadImages } from "@/lib/ImagesUpload"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { BranchIProps } from "@/types"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
	code: z.string().min(4),
	username: z.string().min(2).max(50),
	email: z.string(),
	password: z.string(),
	branchName: z.string(),
	district: z.string(),
	ps: z.string(),
	address: z.string(),
	teamLeaderName: z.string(),
	teamLeaderPhone: z.string(),
	teamLeaderAddress: z.string(),
	teamLeaderOccupation: z.string(),
	presidentName: z.string(),
	presidentAddress: z.string(),
	presidentPhone: z.string(),
	presidentOccupation: z.string(),
	ImamName: z.string(),
	ImamAddress: z.string(),
	ImamPhone: z.string(),
	ImamOccupation: z.string(),
	SecretaryName: z.string(),
	SecretaryAddress: z.string(),
	SecretaryPhone: z.string(),
	SecretaryOccupation: z.string(),
});
const initialState = {
	photoUrl: "",
	message: "",
	error: false
};
const initialStateBranch = {
	photoUrl: [],
	message: "",
	error: false
};

function BranchCreate() {
	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const [state, formAction] = useFormState(uploadImage, initialState);
	const [stateBranch, formActionBranch] = useFormState(uploadImages, initialStateBranch);
	const { pending } = useFormStatus();

	const upload = stateBranch.photoUrl.length >= 1 === true && state.photoUrl.length >= 1 === true;

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ username, email, password, branchName, address, photoUrl, teamLeaderName, teamLeaderAddress, teamLeaderPhone, teamLeaderOccupation, teamLeaderPhotoUrl, presidentName, presidentAddress, presidentPhone, presidentOccupation, ImamName, ImamAddress, ImamPhone, ImamOccupation, SecretaryName, SecretaryAddress, SecretaryPhone, SecretaryOccupation, code, district, ps }: BranchIProps) => {
			const response = await axios.post("/api/admin_branch", {
				username, email, password, branchName, address, photoUrl, teamLeaderName, teamLeaderAddress, teamLeaderPhone, teamLeaderOccupation, teamLeaderPhotoUrl, presidentName, presidentAddress, presidentPhone, presidentOccupation, ImamName, ImamAddress, ImamPhone, ImamOccupation, SecretaryName, SecretaryAddress, SecretaryPhone, SecretaryOccupation, code, district, ps
			});
			return response.data;
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		const photoUrl = stateBranch.photoUrl;
		const teamLeaderPhotoUrl = state.photoUrl;
		const code = values.code;
		const username = values.username;
		const email = values.email;
		const password = values.password;
		const branchName = values.branchName;
		const district = values.district;
		const ps = values.ps;
		const address = values.address;
		const teamLeaderName = values.teamLeaderName;
		const teamLeaderPhone = values.teamLeaderPhone;
		const teamLeaderAddress = values.teamLeaderAddress;
		const teamLeaderOccupation = values.teamLeaderOccupation;
		const presidentName = values.presidentName;
		const presidentAddress = values.presidentAddress;
		const presidentPhone = values.presidentPhone;
		const presidentOccupation = values.presidentOccupation;
		const ImamName = values.ImamName;
		const ImamAddress = values.ImamAddress;
		const ImamPhone = values.ImamPhone;
		const ImamOccupation = values.ImamOccupation;
		const SecretaryName = values.SecretaryName;
		const SecretaryAddress = values.SecretaryAddress;
		const SecretaryPhone = values.SecretaryPhone;
		const SecretaryOccupation = values.SecretaryOccupation;

		// Branch Created
		mutate({ username, email, password, branchName, address, photoUrl, teamLeaderName, teamLeaderAddress, teamLeaderPhone, teamLeaderOccupation, teamLeaderPhotoUrl, presidentName, presidentAddress, presidentPhone, presidentOccupation, ImamName, ImamAddress, ImamPhone, ImamOccupation, SecretaryName, SecretaryAddress, SecretaryPhone, SecretaryOccupation, code, district, ps }, {
			onSuccess: ({ message, result }: { message: string, result: BranchIProps }) => {
				if (result.id) {
					toast.success(message)
				} else {
					throw new Error("Branch Created Failed")
				}
				router.push('/admin');
			},
			onError: (error) => {
				toast.error("payment Request Created Failed");
			}
		});
	};
	// console.log(state, stateBranch);

	return (
		<div className=" flex flex-col gap-2">
			<div className=" flex flex-row p-2 justify-around gap-2">
				<form action={formActionBranch} className='flex flex-col'>
					<Label htmlFor="BranchPicture" className=" text-[15px]">Branch Photos</Label>
					<div className="flex flex-row gap-1 border-2 rounded-md justify-center p-2">
						<input type="file" name="BranchPicture" id="BranchPicture" accept='image/*' multiple />
						{pending ? <Button disabled >Uploading...</Button> : <Button type="submit">Upload</Button>}
					</div>
					{
						stateBranch.photoUrl.length >= 1 && <p className='text-center text-color-main'>{stateBranch.message}</p>
					}
					{
						stateBranch.error === true && <p className='text-center text-color-sub'>{stateBranch.message}</p>
					}
				</form>
				<form action={formAction} className='flex flex-col'>
					<Label htmlFor="teamLeaderPicture" className=" text-[15px]">Team Leader Photo</Label>
					<div className="flex flex-row gap-1 border-2 rounded-md justify-center p-2">
						<input type="file" name="teamLeaderPicture" id="teamLeaderPicture" accept='image/*' />
						{pending ? <Button disabled >Uploading...</Button> : <Button type="submit">Upload</Button>}
					</div>
					{
						state.photoUrl.length >= 1 && <p className='text-center text-color-main'>{state.message}</p>
					}
					{
						state.error === true && <p className='text-center text-color-sub'>{state.message}</p>
					}
				</form>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<div className=" grid grid-cols-3 gap-3">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code</FormLabel>
									<FormControl>
										<Input placeholder="code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="branchName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Branch Name</FormLabel>
									<FormControl>
										<Input placeholder="Branch Name" {...field} />
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
										<Input placeholder="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input placeholder="district" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ps"
							render={({ field }) => (
								<FormItem>
									<FormLabel>PS</FormLabel>
									<FormControl>
										<Input placeholder="ps" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input placeholder="address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamLeaderName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Leader Name</FormLabel>
									<FormControl>
										<Input placeholder="team leader name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamLeaderPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Leader Phone</FormLabel>
									<FormControl>
										<Input placeholder="team Leader Phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamLeaderAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Leader Address</FormLabel>
									<FormControl>
										<Input placeholder="team leader Address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="teamLeaderOccupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Leader Occupation</FormLabel>
									<FormControl>
										<Input placeholder="occupation" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="presidentName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>President Name</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="presidentAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>President Address</FormLabel>
									<FormControl>
										<Input placeholder="address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="presidentPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>President Phone</FormLabel>
									<FormControl>
										<Input placeholder="phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="presidentOccupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>President Occupation</FormLabel>
									<FormControl>
										<Input placeholder="occupation" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ImamName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imam Name</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ImamAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imam Address</FormLabel>
									<FormControl>
										<Input placeholder="address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ImamPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imam Phone</FormLabel>
									<FormControl>
										<Input placeholder="phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ImamOccupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imam Occupation</FormLabel>
									<FormControl>
										<Input placeholder="occupation" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="SecretaryName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secretary Name</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="SecretaryAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secretary Address</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="SecretaryPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secretary Phone</FormLabel>
									<FormControl>
										<Input placeholder="phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="SecretaryOccupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secretary Occupation</FormLabel>
									<FormControl>
										<Input placeholder="occupation" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{isPending ? <Button disabled >Loading...</Button> : <Button disabled={upload === false} type="submit">Submit</Button>}
				</form>
			</Form>
		</div>
	)
}

export default BranchCreate;