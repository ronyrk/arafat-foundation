import * as React from "react"
import { ChildIProps } from "@/types";
import { unstable_noStore } from "next/cache";
import ChildCarouselSlider from "./ChildCarouselSlider";


export async function ChildCarousel() {
	unstable_noStore();
	let response = await fetch('https://af-admin.vercel.app/api/child');
	if (!response.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ChildIProps[] = await response.json();
	return (
		<div className="rounded-md">
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<ChildCarouselSlider data={data} />
			</div>
		</div>
	)
}
