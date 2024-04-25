import * as React from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import icon from "../../public/divider.svg";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
		<div className=" bg-gray-100 rounded-md">
			<h1 className="text-center text-2xl text-color-main font-semibold py-2">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="text-center text-base  text-color-main font-medium py-2">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-base  text-color-main font-medium border-dotted py-2">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<ProjectCarousel data={data} />
			</div>
		</div>
	)
}
