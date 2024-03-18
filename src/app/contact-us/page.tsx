import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'


function page() {
	return (
		<div className='md:mx-20 md:my-4 my-2'>
			<div className="flex md:flex-row flex-col gap-2">
				<div className=" basis-1/2">
					<Card className='w-1000'>
						<CardHeader>
							<CardTitle>
								<h2 className="text-2xl font-semibold  pb-2">Contact Us</h2>
							</CardTitle>
							<p className="text-xl font-normal border-b-2  border-gray-200 pb-2 ">Enter your details and we&lsquo;ll get back to you.</p>
						</CardHeader>
						<CardContent>
							<div className="space-y-1">
								<div className="space-y-1">
									<Label htmlFor="name">Email</Label>
									<Input id="name" placeholder="name" type="text" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input id="email" placeholder="Email" type="email" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="phone">Phone</Label>
									<Input id="phone" placeholder="phone" type="tel" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="message">Message</Label>
									<Textarea className="min-h-[80px]" id="message" placeholder="Your message" />
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="ml-auto">Submit</Button>
						</CardFooter>
					</Card>
				</div>
				<div className=" basis-1/2">
					<div className="max-w-md h-[540px] mx-auto bg-white p-6 rounded-lg shadow flex flex-col justify-around">
						<h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4">Contact Info</h2>
						<div className="mt-2">
							<div className="flex items-center space-x-3">
								<PhoneIcon className="text-blue-500" />
								<div>
									<h3 className="text-lg font-medium">Phone</h3>
									<p className="text-gray-600">01602505070</p>
								</div>
							</div>
							<div className="flex items-center space-x-3 mt-4">
								<MailboxIcon className="text-blue-500" />
								<div>
									<h3 className="text-lg font-medium">Email</h3>
									<p className="text-gray-600">contact@arafatfoundation.org</p>
								</div>
							</div>
							<div className="flex items-center space-x-3 mt-4">
								<LocateIcon className="text-blue-500" />
								<div>
									<h3 className="text-lg font-medium">Location</h3>
									<p className="text-gray-600">Yousufpur, Charghat, Rajshahi-6271, Bangladesh</p>
								</div>
							</div>
						</div>
						<div className="mt-6">
							<h3 className="text-lg font-medium">Follow Us:</h3>
							<div className="flex flex-row space-x-4 items-center mt-2">
								<Link className=' bg-blue-400 p-2 rounded-sm' href={'/'}>
									<Facebook size={35} className='text-white' />
								</Link>
								<Link className=' bg-blue-400 p-2 rounded-sm' href={'/'}>
									<Twitter size={35} className='text-white' />
								</Link>
								<Link className=' bg-red-400 p-2 rounded-sm' href={'/'}>
									<Instagram size={35} className='text-white' />
								</Link>
								<Link className=' bg-blue-400 p-2 rounded-sm' href={'/'}>
									<Linkedin size={35} className='text-white' />
								</Link>
								<Link className=' bg-red-400 p-2 rounded-sm' href={'/'}>
									<Youtube size={35} className='text-white' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-4">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58144.75383517318!2d88.56496015505027!3d24.379664360314155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi!5e0!3m2!1sen!2sbd!4v1710786811381!5m2!1sen!2sbd" className='w-full' height="300" loading="lazy"></iframe>
			</div>
		</div>
	)
}

export default page



function LocateIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="2" x2="5" y1="12" y2="12" />
			<line x1="19" x2="22" y1="12" y2="12" />
			<line x1="12" x2="12" y1="2" y2="5" />
			<line x1="12" x2="12" y1="19" y2="22" />
			<circle cx="12" cy="12" r="7" />
		</svg>
	)
}


function MailboxIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
			<polyline points="15,9 18,9 18,11" />
			<path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
			<line x1="6" x2="7" y1="10" y2="10" />
		</svg>
	)
}


function PhoneIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	)
}
