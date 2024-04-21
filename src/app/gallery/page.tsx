import GallerySidebar from '@/components/GallerySidebar'
import React, { Suspense } from 'react'
import icon from "../../../public/divider.svg"
import Image from 'next/image'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog"
import { GalleryCarousel } from '@/components/Gallery'
import { getGallery } from '@/lib/getGallery'

async function GalleryList({ query }: { query: string }) {
	const data = await getGallery(query);
	return (
		<div className="grid grid-cols-5 py-3 md:px-1 px-5 md:grid-cols-3 content-stretch gap-3">
			{
				data.slice(0, 11).map((item, index) => (
					<Dialog key={index}>
						<DialogTrigger>
							<Image src={item.content} className='rounded-md  hover:opacity-90' width={308} height={208} alt={item.category} />
						</DialogTrigger>
						<DialogContent className=''>
							<div className="">
								<GalleryCarousel query={query} />
							</div>
						</DialogContent>
					</Dialog>
				))
			}
		</div>

	)
}


async function page({ searchParams }: {
	searchParams?: {
		type?: string,
		page?: string,
	}
}) {
	const query = searchParams?.type || "all";
	const page = searchParams?.page || "1";
	return (
		<section className="bg-[#FCFCFD]">
			<div className="my-2 md:mx-20 md:my-4">
				<h1 className="py-2 text-4xl font-semibold text-center text-color-main">গ্যালারী</h1>
				<div className='flex flex-col items-center justify-center gap-2 py-3 '>
					<Image src={icon} alt='icon' />
				</div>
				<div className="flex flex-col gap-4 md:flex-row">
					<Suspense fallback={<h2>Loading...</h2>}>
						<div className="basis-1/5">
							<GallerySidebar />
						</div>
					</Suspense>
					<div className=" md:p-1 bg-white  rounded-md border-[2px] basis-4/5">
						<Suspense fallback={<h2>Loading...</h2>}>
							<GalleryList query={query} />
						</Suspense>
					</div>
				</div>
			</div>
		</section>
	)
}

export default page