import * as React from "react"
import Image from "next/image"
import icon from "../../public/divider.svg";
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
		<div className=" bg-gray-100 rounded-md">
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">শিশুকে পৃষ্ঠপোষকতা</h1>
			<h1 className="text-center text-base  text-color-main font-medium py-2">একটি শিশুকে পৃষ্ঠপোষকতা করার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে ঝরে পড়ার ঝুঁকি ছাড়াই তার শিক্ষা লাভ করা যায়।</h1>
			<div className=' flex justify-center flex-col items-center gap-2 py-4'>
				<h1 className="text-center text-base  text-color-main font-semibold border-dotted py-2">আমাদের শিশু স্পনসরশিপ প্রোগ্রামে আপনি একটি শিশু এবং তার সম্প্রদায়ের জন্য সহায়তা প্রদান করতে পারেন।</h1>
				<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
			</div>
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<ChildCarouselSlider data={data} />
			</div>
		</div>
	)
}
