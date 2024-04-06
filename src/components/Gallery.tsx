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
					<CarouselItem className=" flex justify-center" key={index}>
						<Image src={item.content} className=' rounded-sm object-fill ' width={1024} height={500} alt={item.category} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-color-main" />
			<CarouselNext className=" text-color-main" />
		</Carousel>
	)
}
