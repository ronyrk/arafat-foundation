import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function GalleryCarousel() {
	return (
		<Carousel className="w-full">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem className=" flex justify-center" key={index}>
						<Image src="/gallery-14.jpg" className=' rounded-sm object-fill ' width={1024} height={500} alt='icon' />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-color-main" />
			<CarouselNext className=" text-color-main" />
		</Carousel>
	)
}
