import * as React from "react"
import { ProjectsProps } from "@/types";
import { unstable_noStore } from "next/cache";
import ProjectCarousel from "./ProjectCarousel";

export async function CarouselDemo() {
	unstable_noStore();
	let response = await fetch('https://af-admin.vercel.app/api/project');
	if (!response.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ProjectsProps[] = await response.json();
	return (
		<div className="rounded-md">
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<ProjectCarousel data={data} />
			</div>
		</div>
	)
}
