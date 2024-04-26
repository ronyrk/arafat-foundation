"use client";
import { ProjectsProps } from '@/types';
import React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay"

function ProjectCarousel({ data }: { data: ProjectsProps[] }) {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			plugins={[
				Autoplay({
					delay: 4000,
				}),
			]}
			className="w-full"
		>
			<CarouselContent>
				{data.map((item, index) => (
					<CarouselItem key={index} className=" md:basis-1/3">
						<div className="flex flex-col border-2 justify-stretch rounded shadow-md ">
							<Link href={`/our-projects/${item.username}`}>
								<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
								<div className="w-full px-2 bg-white">
									<h2 className="py-2 text-lg font-semibold text-color-main hover:text-color-sub">{item.title}</h2>
									<p className=" text-[14px] font-medium">{item.shortDes.slice(0, 200)}....</p>
									<div className="flex justify-between py-2 md:flex-row">
										<Button className=' hover:bg-color-sub' asChild>
											<Link href={`/our-projects/${item.username}`}>বিস্তারিত দেখুন</Link>
										</Button>
										<Button variant={"outline"} className='border-2 text-color-main border-color-main hover:text-white hover:border-color-sub' asChild>
											<Link href={`/our-projects/${item.username}`}>দান করুন</Link>
										</Button>
									</div>
								</div>
							</Link>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-black border-color-main" />
			<CarouselNext className=" text-black border-color-main" />
		</Carousel>
	)
}

export default ProjectCarousel