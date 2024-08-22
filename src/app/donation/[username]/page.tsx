import ChildDonate from '@/components/ChildDonate';
import { ChildIProps } from '@/types';
import { unstable_noStore } from 'next/cache';
import React, { Suspense } from 'react'

async function Donation({ params }: {
	params: {
		username: string
	}
}) {
	unstable_noStore();
	let res = await fetch(`https://af-admin.vercel.app/api/child/${params.username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ChildIProps = await res.json();
	return (
		<div className="flex justify-center items-center my-4">
			<ChildDonate data={data} />
		</div>
	)
}

export default Donation