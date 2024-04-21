import React, { Suspense } from 'react'
import icon from "../../public/divider.svg"
import Image from 'next/image'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog"
import { GalleryCarousel } from '@/components/Gallery'
import { getGallery } from '@/lib/getGallery'
import HomeGallerySidebar from './HomeGallerySidebar'
import { Button } from '@/components/ui/button';
import Link from 'next/link'

async function GalleryList({ query }: { query: string }) {
	const data = await getGallery(query);
	return (
		<div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-2">
			{
				data.map((item, index) => (
					<Dialog key={index}>
						<DialogTrigger className=''>
							<div className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-1 ">
								<Image src={item.content} className='rounded-md hover:opacity-90' width={308} height={208} alt={item.category} />
							</div>
						</DialogTrigger>
						<DialogContent className='w-full '>
							<div className="flex justify-center">
								<GalleryCarousel query={query} />
							</div>
						</DialogContent>
					</Dialog>
				))
			}
		</div>

	)
}


async function HomeGallery({ query }: {
	query: string
}) {
	return (
		<section id='gallery' className="bg-[#FCFCFD]">
			<div className="my-2 md:mx-20 md:my-4">
				<h1 className="py-2 text-4xl font-semibold text-center text-color-main">গ্যালারী</h1>
				<div className='flex flex-col items-center justify-center gap-2 py-3 '>
					<Image src={icon} alt='icon' />
				</div>
				<div className="flex flex-col gap-3">
					<Suspense fallback={<h2>Loading...</h2>}>
						<div className="">
							<HomeGallerySidebar />
						</div>
					</Suspense>
					<div className="rounded-md md:p-1">
						<Suspense fallback={<h2>Loading...</h2>}>
							<GalleryList query={query} />
						</Suspense>
						<div className="flex justify-center py-4">
							<Button size={"lg"} className='text-black bg-white border-2 border-black hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
								<Link href="/gallery">আরো দেখুন</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HomeGallery