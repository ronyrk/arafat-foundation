import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel1"
import Image from "next/image";
import { Button } from "@/components/ui/button";


const data = ["/SP1.jpg", "/SP2.jpg", "/SP3.jpg", "/SP4.jpg", "/SP5.jpg"]

export default function Home() {
  return (
    <div className="">
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          {data?.map((item, index) => (
            <CarouselItem key={index} className=" relative">
              <div className="h-[80vh]">
                <Image src={item} width={600} height={300} className=" object-fill w-full brightness-50" alt="name" />
              </div>
              <div className=" absolute left-24 top-24 z-30 leading-loose">
                <h2 className=" text-[40px] font-bold text-white">সদকা মানুষের বিপদ দূরীভূত করে</h2>
                <h2 className=" text-[40px] font-bold  text-white">অপমৃত্যু থেকে বাঁচায় এবং পাপ মোচন করে</h2>
                <p className=" text-white text-xl font-semibold">আরাফাত ফাউন্ডেশন একটি রাজনৈতিক এবং অলাভজনক মূলত</p>
                <p className=" pb-4 text-white text-xl font-semibold "> মানব কল্যাণমূলক  নিবেদিত সেবামূলক  প্রতিষ্ঠান</p>
                <Button size={"lg"} className=" px-8 py-2 bg-color-sub hover:bg-color-main">দান করুন</Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" text-blue-400 font-extrabold" />
        <CarouselNext className=" text-blue-400 font-extrabold" />
      </Carousel>

    </div>
  );
}
