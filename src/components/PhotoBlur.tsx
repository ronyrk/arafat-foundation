"use client";
import Image from 'next/image'
import React from 'react'
import { useUser } from './ContextProvider';

function PhotoBlur({ url, name }: { url: string, name: string, author?: boolean }) {
	const { user } = useUser();
	return (
		<div>
			{
				user?.email ? <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=' rounded-md object-cover' src={url} alt={name} width={260} height={140} /> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=' rounded-md object-cover blur-[6px]' src={url} alt={name} width={260} height={140} />
			}
		</div>
	)
}

export default PhotoBlur