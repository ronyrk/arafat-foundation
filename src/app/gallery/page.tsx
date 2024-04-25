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
import { unstable_noStore } from 'next/cache'

async function GalleryList({ query }: { query: string }) {
	unstable_noStore();
	const data = await getGallery(query);
	return (
		<div className="grid grid-cols-5 py-3 md:px-1 px-5 md:grid-cols-3 content-stretch gap-3">
			{
				data.map((item, index) => (
					<Dialog key={index}>
						<DialogTrigger>
							<div className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-1 ">
								{
									item.category === "video" ? <iframe width="308" height="208" className='object-fill rounded-md' src={`${item.content}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe> : <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.content} className=' rounded-md hover:opacity-90' width={308} height={208} alt={item.category} />
								}
							</div>
						</DialogTrigger>
						<DialogContent className='w-full flex justify-center items-center '>
							<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.content} className=' rounded-md hover:opacity-90' width={500} height={500} alt={item.category} />
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