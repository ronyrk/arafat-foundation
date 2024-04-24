import * as React from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { getGallery } from "@/lib/getGallery"

export async function GalleryCarousel({ query }: { query: string }) {
	const data = await getGallery(query);
	return (
		<Carousel className="w-full">
			<CarouselContent>
				{data?.map((item, index) => (
					<CarouselItem key={index}>
						<div className="flex items-center justify-center">
							{
								item.category === "video" ? <iframe width="540" height="480" className='  object-fill' src={`${item.content}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.content} className=' object-fill rounded-sm' width={600} height={540} alt={item.category} />
							}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-color-main" />
			<CarouselNext className=" text-color-main" />
		</Carousel>
	)
}

