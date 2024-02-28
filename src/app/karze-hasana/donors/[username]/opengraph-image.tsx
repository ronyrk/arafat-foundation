/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import prisma from '@/lib/prisma';

export const runtime = 'edge'

export default async function Image({ params }: { params: { username: string } }) {
	const username = params.username;
	const donor = await prisma.donor.findUnique({ where: { username } });
	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					fontSize: 60,
					color: 'black',
					background: '#f6f6f6',
					width: '100%',
					height: '100%',
					paddingTop: 50,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img
					width="256"
					height="256"
					src={donor?.photoUrl}
					style={{
						borderRadius: 128,
					}}
					alt={donor?.name}
				/>
				<p>github.com/{username}</p>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}