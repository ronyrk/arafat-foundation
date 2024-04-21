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
						{
							item.category === "video" ? <iframe width="500" height="500" className='object-fill rounded-md' src={`${item.content}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe> : <Image src={item.content} className=' rounded-sm object-fill ' width={500} height={500} alt={item.category} />
						}

					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-color-main" />
			<CarouselNext className=" text-color-main" />
		</Carousel>
	)
}


