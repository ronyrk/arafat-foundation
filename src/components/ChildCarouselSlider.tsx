"use client";
import { ChildIProps } from '@/types';
import Image from 'next/image';
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay"

function ChildCarouselSlider({ data }: { data: ChildIProps[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/4">
            <div className="relative flex flex-col border-2 rounded-md shadow-md ">
              <Link href={`/sponsor-a-child/${item.username}`}>
                <Image src={item.photoUrl} width={248} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='w-full h-[260px] object-fill rounded' alt={item.username} />
                <p className="absolute px-2 py-[2px] text-sm bg-white rounded top-2 left-2">{item.academy}</p>
                <div className="w-full px-1 bg-white">
                  <h2 className="py-2 text-xl font-semibold text-color-main hover:text-color-sub">{item.name}</h2>
                  <div className="flex flex-row py-1">
                    <h2 className="text-[15px] font-medium">স্বপ্ন :</h2>
                    <h2 className="text-[15px] pl-6 font-medium">{item.dream}</h2>
                  </div>
                  <div className="flex flex-row py-1">
                    <h2 className="text-[15px]  font-medium">ফোন :</h2>
                    <h2 className="text-[15px] pl-4 font-medium">{item.phone}</h2>
                  </div>
                  <div className="flex flex-row py-1">
                    <h2 className="text-[15px]  inline  font-medium">ঠিকানা:</h2>
                    <h2 className="text-[15px] pl-2 font-medium">{item.address}</h2>
                  </div>
                  <div className="flex justify-around py-2 md:flex-row">
                    <Button className='w-[130px] px-4 text-white rounded-sm bg-color-sub hover:bg-color-main' asChild>
                      <Link href={`/sponsor-a-child/${item.username}`}>প্রোফাইল দেখুন</Link>
                    </Button>
                    <Button className='w-[130px] px-4 text-white rounded-sm bg-color-main hover:bg-color-sub' asChild>
                      <Link href={`/donation/${item.username}`}>স্পন্সর করুন</Link>
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" text-black border-color-main" />
      <CarouselNext className=" text-black border-color-main" />
    </Carousel>
  )
}

export default ChildCarouselSlider