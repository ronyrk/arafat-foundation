"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useUser } from './ContextProvider'









function PaymentRequest({ username, branch }: { username: string, branch: string }) {
	const { user } = useUser();


	return (
		<div className="py-2">
			{
				user?.username === branch &&
				<Button asChild>
					<Link href={`${username}/${branch}`}>Payment Request</Link>
				</Button>
			}
		</div>
	)
}

export default PaymentRequest