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


function page() {
	return (
		<div className='md:mx-20 md:my-4 my-2'>
			<div className="flex flex-row gap-2">
				<div className=" basis-1/2">
					<Card className='w-1000'>
						<CardHeader>
							<CardTitle>Contact Us</CardTitle>
							<CardDescription>Enter your details and we&lsquo;ll get back to you.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Email</Label>
									<Input id="name" placeholder="name" type="text" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" placeholder="Email" type="email" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone</Label>
									<Input id="phone" placeholder="phone" type="tel" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea className="min-h-[100px]" id="message" placeholder="Your message" />
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="ml-auto">Submit</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default page