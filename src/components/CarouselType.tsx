import * as React from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import icon from "../../public/divider.svg";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CarouselDemo() {
	return (
		<div className=" bg-gray-100 rounded-md">
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="text-center text-xl  text-color-main font-medium py-2">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-xl  text-color-main font-semibold border-dotted py-2">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image src={icon} alt='icon' />
			</div>
			<div className=" flex justify-center items-center md:mx-0 mx-12">
				<Carousel
					opts={{
						align: "start",
					}}
					className="w-full"
				>
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index} className="md:basis-1/3">
								<div className=" flex justify-center items-center flex-col">
									<Image src="/Ramadan-activities.jpg" width={382} height={120} className=' md:w-[382px] w-full md:h-[260px] h-[200px] object-fill rounded' alt='card' />
									<div className="w-full border-2 p-2 rounded bg-white">
										<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-1">রমজান প্রজেক্ট ২০২৪</h2>
										<p className=" text-[13px]  font-medium">আসসালামু আলাইকুম।আলহামদুলিল্লাহ, আর অল্প কিছুদিন পরেই আমরা আরো একটা পবিত্র রমজান মাস পেতে যাচ্ছি।এই রমজান মাসে আমরা প্রতিদিন ৫০/১০০ জন</p>
										<div className="flex flex-row justify-around py-1 ">
											<Button className='w-fit hover:bg-color-sub' asChild>
												<Link href="/">বিস্তারিত দেখুন</Link>
											</Button>
											<Button variant={"outline"} className=' w-fit text-color-main border-color-main hover:border-color-sub border-2 hover:text-white' asChild>
												<Link href="/login">দান করুন</Link>
											</Button>

										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className=" text-black border-color-main" />
					<CarouselNext className=" text-black border-color-main" />
				</Carousel>
			</div>
		</div>
	)
}
