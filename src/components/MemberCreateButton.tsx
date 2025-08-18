"use client";
import React from 'react'
import { useUser } from './ContextProvider';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

function MemberCreateButton({ username }: { username: string }) {
	const { user } = useUser();
	return (
		<div className='py-2'>
			{
				user?.username === username && <Button asChild>
					<Link prefetch={false} href={`${username}/member`}>Member Add</Link>
				</Button>
			}
		</div>
	)
}

export default MemberCreateButton