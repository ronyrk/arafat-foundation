/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import prisma from '@/lib/prisma';

export const runtime = 'edge'

export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png';

export default async function Image({ params }: { params: { username: string } }) {
	const username = params.username;
	const donor = await prisma.donor.findUnique({ where: { username } });
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 48,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img src={donor?.photoUrl} alt={donor?.name} />
			</div>
		),
		{
			...size,
		}
	)
}