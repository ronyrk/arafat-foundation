"use client";
import Autoplay from "embla-carousel-autoplay"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel1"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const data = ["/SP1.jpg", "/SP2.jpg", "/SP3.jpg", "/SP4.jpg", "/SP5.jpg"]

function HomeCarousel() {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 8000,
				}),
			]}
			className="w-full">
			<CarouselContent className="w-full">
				{data?.map((item, index) => (
					<CarouselItem key={index} className=" relative ">
						<div className="">
							<Image src={item} width={600} height={300} className=" md:h-[80vh] h-[45vh] object-cover w-full brightness-50 rounded-md" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="name" />

							<div className=" absolute md:left-24 left-10  md:top-24 top-10 z-30 leading-loose">
								<h2 className=" md:text-[40px] text-[12px] font-bold pt-1 text-white">সদকা মানুষের বিপদ দূরীভূত করে</h2>
								<h2 className=" md:text-[40px] text-[18px] font-bold text-white">অপমৃত্যু থেকে বাঁচায় এবং পাপ মোচন করে |</h2>
								<p className=" text-white md:text-xl text-[12px] font-semibold pb-4 pt-2">আরাফাত ফাউন্ডেশন একটি রাজনৈতিক এবং অলাভজনক মূলত <br /> মানব কল্যাণমূলক  নিবেদিত সেবামূলক  প্রতিষ্ঠান</p>
								{/* <p className=" pb-2 text-white md:text-xl text-sm font-semibold "> মানব কল্যাণমূলক  নিবেদিত সেবামূলক  প্রতিষ্ঠান</p> */}
								<Button size={"lg"} asChild className=" px-8 py-2 bg-color-sub hover:bg-color-main">
									<Link href={"/our-projects"}>দান করুন</Link>
								</Button>

							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className=" text-blue-400 font-extrabold" />
			<CarouselNext className=" text-blue-400 font-extrabold" />
		</Carousel>
	)
}

export default HomeCarousel