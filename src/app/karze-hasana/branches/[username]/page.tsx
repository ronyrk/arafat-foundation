import BorrowersList from "@/components/BorrowersList";
import { BranchIProps } from "@/types";
import { cookies } from "next/headers";
import React from "react";
import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";
import { Share } from "@/components/Share";
import { notFound } from "next/navigation";

type Props = { params: { username: string } };

export async function generateMetadata({ params }: Props) {
	unstable_noStore();
	const data = await prisma.branchList.findUnique({
		where: { username: params.username },
		select: { branchName: true, photoUrl: true },
	});
	if (!data) return {};
	return {
		title: data.branchName,
		openGraph: {
			images: [
				{ url: data.photoUrl.at(0), width: 800, height: 600, alt: data.branchName },
				{ url: data.photoUrl.at(0), width: 1800, height: 1600, alt: data.branchName },
			],
		},
	};
}

export default async function page({
	params,
	searchParams,
}: {
	params: { username: string };
	searchParams?: { page?: string };
}) {
	cookies(); // ensures dynamic rendering
	const page = searchParams?.page ?? "1";
	const { username } = params;

	// Single fetch — branch data + paginated borrowers (with payment summaries) in one round-trip
	const response = await fetch(
		`https://arafatfoundation.org/api/branch/${username}?page=${page}`,
		{ cache: "no-store" }
	);

	if (!response.ok) notFound();

	const { data, pagination } = await response.json();
	const branchData: BranchIProps = data;

	if (!branchData) notFound();

	return (
		<div className="p-1 px-4 border-2 rounded">
			<div className="flex flex-col">
				<h2 className="py-1 text-2xl font-medium text-center text-color-main">
					Branch details
				</h2>
				<h2 className="py-1 text-3xl font-medium text-center text-color-main">
					{branchData.branchName}
				</h2>
				<h2 className="py-1 text-xl font-medium text-center text-color-main">
					ঠিকানা:- {branchData.address}
				</h2>
			</div>

			{/* Pass pre-computed pagination metadata — no more client-side counting */}
			<BorrowersList page={page} data={branchData} />

			<div className="py-2 px-4">
				<Share username={branchData.username} type="karze-hasana/branches" />
			</div>
		</div>
	);
}