"use client";
import { OwnerIProps, ProjectsProps } from '@/types';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay"

function MemberCarousel({ data, large = false }: { data: OwnerIProps[], large?: boolean }) {

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
                    <CarouselItem key={index} className=" md:basis-1/4">
                        <div className={`relative flex flex-col items-center w-full`}>
                            <div className={`w-full aspect-square relative flex flex-col items-center justify-center rounded-lg overflow-hidden bg-gradient-to-t from-[#2D2150] from-70% to-[#FF9666] to-30% group hover:shadow-xl transition-shadow duration-300`}>
                                <div className={`absolute top-[10%] flex justify-center items-center `}>
                                    <div className={`relative w-32 h-32 rounded-full overflow-hidden bg-white`}>
                                        <Image
                                            src={item.photos}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-[55%] flex flex-col items-center">
                                    <h3 className="text-white font-medium text-center">{item.name}</h3>
                                    <p className="text-gray-200 text-sm mb-2">{item.type}</p>
                                    <Button
                                        variant="secondary"
                                        className="bg-[#FF9666] hover:bg-[#ff8652] text-white text-xs px-4 py-1 h-7"
                                        asChild
                                    >
                                        <Link href={`/team-member/`}>
                                            DETAILS
                                        </Link>
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
    )
}

export default MemberCarousel