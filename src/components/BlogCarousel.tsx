"use client";
import { NewsProps } from '@/types';
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
import Autoplay from "embla-carousel-autoplay"

function BlogCarousel({ data }: { data: NewsProps[] }) {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
			className="w-full"
		>
			<CarouselContent>
				{data.map((item, index) => (

					<CarouselItem key={index} className="md:basis-1/3">

						<Link key={index} href={`/blog/${item.username}`}>
							<div className="flex flex-col border-2  rounded-md shadow-xl ">
								<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.photoUrl} width={382} height={120} className='md:w-[382px] w-full h-[260px] object-fill rounded' alt={item.username} />
								<div className="justify-around w-full px-2 py-2 bg-white border-t-2">
									<h2 className="py-2 text-lg font-semibold text-color-main hover:text-color-sub">{item.title}</h2>
									<p className=" text-[14px] py-1 font-medium">{item.shortDes?.slice(0, 100)}....</p>
									<Link className='py-1 text-sm font-bold hover:text-color-sub' href={`blog/${item.username}`}>CONTINUE READING</Link>
								</div>
							</div>
						</Link>

					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-black border-color-main" />
			<CarouselNext className=" text-black border-color-main" />
		</Carousel>
	)
}

export default BlogCarousel