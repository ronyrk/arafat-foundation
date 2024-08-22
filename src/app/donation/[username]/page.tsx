import ChildDonate from '@/components/ChildDonate';
import { ChildIProps } from '@/types';
import { unstable_noStore } from 'next/cache';
import React, { Suspense } from 'react'

async function Donation({ params }: {
	params: {
		username: string
	}
}) {
	// const { data, isLoading } = useQuery({
	// 	queryKey: ["child"],
	// 	queryFn: async () => {
	// 		const response = await axios.get(`/api/child/${params.username}`);
	// 		return response.data;
	// 	},
	// 	// refetchInterval: 1000,
	// });
	// console.log(data, "result");
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