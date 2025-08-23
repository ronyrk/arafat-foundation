import { BeneficialIProps } from '@/types';
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import BeneficialDocuments from './beneficial-doucment';
import { Share } from './Share';
import { PhoneDisplay } from './phone-number-display';

// Types for your API data
interface BeneficialDonor {
    id: string;
    name: string;
    username: string;
    live: string;
    homeTown: string;
    photoUrl: string;
    about: string;
    createAt: string;
};


function BeneficialProfileEdit({ data }: { data: BeneficialIProps }) {

    const { id, username, name, photoUrl, about, village, postoffice, district, policeStation, occupation, phone, beneficialDonorId, nidFront, nidBack } = data;

    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex md:flex-row flex-col gap-6 px-2">
                {/* Profile Images */}
                <div className="basis-4/12 border rounded-lg p-4 flex flex-col items-center bg-white shadow">
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {photoUrl.map((img, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={img}
                                        alt={`Beneficial Image ${index + 1}`}
                                        width={600}
                                        height={500}
                                        priority
                                        className="object-cover rounded-lg"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-gray-200 text-blue-900 font-extrabold rounded-full shadow-md" />
                        <CarouselNext className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-gray-200 text-blue-900 font-extrabold rounded-full shadow-md" />
                    </Carousel>
                </div>

                {/* Profile Info */}
                <div className="basis-4/12 border rounded-lg p-4 flex flex-col gap-4 bg-white shadow">
                    <div className='grid grid-cols-1 justify-stretch gap-y-4 gap-1 mb-2'>
                        <p className='text-2xl font-semibold'><strong></strong> {name}</p>
                        <p><strong>Village:</strong> {village}</p>
                        <p><strong>Post Office:</strong> {postoffice}</p>
                        <p><strong>District:</strong> {district}</p>
                        <p><strong>Police Station:</strong> {policeStation}</p>
                        <p><strong>Occupation:</strong> {occupation}</p>

                        {/* Phone number with toggle functionality */}
                        <PhoneDisplay phone={phone} />
                    </div>
                </div>
                <BeneficialDocuments data={data} />
            </div>

            <div className="py-2 px-4">
                <Share username={data.username} type='beneficial' />
            </div>

            {/* About Section */}
            <div className="px-4 my-4 bg-white rounded-lg shadow mx-2">
                <div className="py-4" dangerouslySetInnerHTML={{ __html: about?.split("^")[0] as string }} />
            </div>
        </div>
    )
}

export default BeneficialProfileEdit