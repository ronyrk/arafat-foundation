"use client";
import Image from 'next/image'
import React from 'react'
import { useUser } from './ContextProvider';

function PhotoBlur({ url, name }: { url: string, name: string }) {
	const { user } = useUser();
	return (
		<div>
			{
				user?.email ? <Image className=' rounded-md object-cover' src={url} alt={name} width={260} height={140} /> : <Image className=' rounded-md object-cover blur-lg' src={url} alt={name} width={260} height={140} />
			}
		</div>
	)
}

export default PhotoBlur