"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { SendEmailIProps } from "@/types"
import { useRouter } from "next/navigation"


const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().min(10, {
		message: "Email must be at least 10 characters.",
	}),
	phone: z.string().min(11, {
		message: "Phone Number must be at least 11 characters.",
	}),
	message: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),

})

export function FeedBack() {
	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	//  Request
	const { mutate, isPending } = useMutation({
		mutationFn: async ({ name, email, phone, message }: SendEmailIProps) => {
			const response = await axios.post("/api/send", {
				name, email, phone, message
			});
			return response.data;
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		const name = values.name;
		const email = values.email;
		const phone = values.phone;
		const message = values.message;
		mutate({ name, email, phone, message }, {
			onSuccess: ({ message }: { message: string }) => {
				// console.log(message, "output");
				toast.success(message);
				router.push("/");
			},
			onError: (error) => {
				toast.error("payment Request Created Failed");
			}
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} />
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
								<Input type="email" placeholder="example@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder="phone number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea className="min-h-[80px]" id="message" placeholder="Your message"  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isPending ? <Button disabled >Loading</Button> : <Button type="submit">Submit</Button>}
			</form>
		</Form>
	)
}
