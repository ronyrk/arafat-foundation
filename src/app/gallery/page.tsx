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
		<>
			{
				data.map((item, index) => (
					<Dialog key={index}>
						<DialogTrigger>
							<div className=" flex justify-center w-[308px] h-[288px] p-1">
								{
									item.category === "video" ? <iframe width="308" height="280" className='object-fill rounded-md' src={`${item.content}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe> : <Image src={item.content} className=' rounded-md hover:opacity-90' width={308} height={208} alt={item.category} />
								}
							</div>
						</DialogTrigger>
						<DialogContent className=' w-full'>
							<div className="flex justify-center">
								<GalleryCarousel query={query} />
							</div>
						</DialogContent>
					</Dialog>
				))
			}
		</>

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
			<div className="md:mx-20 md:my-4 my-2">
				<h1 className="py-2 text-4xl font-semibold text-center text-color-main">গ্যালারী</h1>
				<div className='flex flex-col items-center justify-center gap-2 py-3 '>
					<Image src={icon} alt='icon' />
				</div>
				<div className="flex md:flex-row flex-col gap-4">
					<Suspense fallback={<h2>Loading...</h2>}>
						<div className="basis-1/5">
							<GallerySidebar />
						</div>
					</Suspense>
					<div className=" md:p-1 bg-white  rounded-md border-[2px] basis-4/5">
						<div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-1">
							<Suspense fallback={<h2>Loading...</h2>}>
								<GalleryList query={query} />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default page