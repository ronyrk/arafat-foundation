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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ChildDonation from "./ChildDonation";

export async function ChildCarousel() {
	unstable_noStore();
	let response = await fetch('https://af-admin.vercel.app/api/project');
	if (!response.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: ProjectsProps[] = await response.json();
	return (
		<div className=" bg-gray-100 rounded-md">
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">শিশুকে পৃষ্ঠপোষকতা</h1>
			<h1 className="text-center text-base  text-color-main font-medium py-2">একটি শিশুকে পৃষ্ঠপোষকতা করার মাধ্যমে আপনি একটি শিশুকে স্কুলে যেতে সাহায্য করতে পারেন যাতে ঝরে পড়ার ঝুঁকি ছাড়াই তার শিক্ষা লাভ করা যায়।</h1>
			<div className=' flex justify-center flex-col items-center gap-2 py-4'>
				<h1 className="text-center text-base  text-color-main font-semibold border-dotted py-2">আমাদের শিশু স্পনসরশিপ প্রোগ্রামে আপনি একটি শিশু এবং তার সম্প্রদায়ের জন্য সহায়তা প্রদান করতে পারেন।</h1>
				<Image src={icon} alt='icon' />
			</div>
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<Carousel
					opts={{
						align: "start",
					}}
					className="w-full"
				>
					<CarouselContent>
						{data.map((item, index) => (
							<CarouselItem key={index} className="md:basis-1/4">
								<div className="relative flex flex-col border-2 rounded-md shadow-md ">
									<Image src="/hhjui.png" width={248} height={120} className='w-full h-[260px] object-fill rounded' alt={item.username} />
									<p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">স্কুল</p>
									<div className="w-full px-1 bg-white">
										<h2 className="py-2 text-xl font-semibold text-color-main hover:text-color-sub">মোসাঃ মাহফুজা</h2>
										<div className="flex flex-row py-1">
											<h2 className="text-[15px] font-medium">স্বপ্ন :</h2>
											<h2 className="text-[15px] pl-6 font-medium">বিসিএস ক্যাডার</h2>
										</div>
										<div className="flex flex-row py-1">
											<h2 className="text-[15px]  font-medium">ফোন :</h2>
											<h2 className="text-[15px] pl-4 font-medium">01738123456</h2>
										</div>
										<div className="flex flex-row py-1">
											<h2 className="text-[15px]  inline  font-medium">ঠিকানা:</h2>
											<h2 className="text-[15px] pl-2 font-medium">টাংগন-পশ্চিম পাড়া, ইউসুফপুর,চারঘাট, রাজশাহী</h2>
										</div>
										<div className="flex justify-around py-2 md:flex-row">
											<Button className='w-[130px] px-4 text-white rounded-sm bg-color-sub hover:bg-color-main' asChild>
												<Link href={`our-projects/${item.username}`}>প্রোফাইল দেখুন</Link>
											</Button>
											<Dialog>
												<DialogTrigger>
													<Button className='w-[130px] px-4 text-white rounded-sm bg-color-main hover:bg-color-sub'>
														স্পন্সর করুন
													</Button>
												</DialogTrigger>
												<DialogContent className='p-4'>
													<ChildDonation username={item.username} />
												</DialogContent>
											</Dialog>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className=" text-black border-color-main" />
					<CarouselNext className=" text-black border-color-main" />
				</Carousel>
			</div>
		</div>
	)
}
