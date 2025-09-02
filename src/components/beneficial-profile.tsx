import { BeneficialIProps, TotalsIProps } from '@/types';
import Image from 'next/image'
import React from 'react'
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
import AddressBlur from './AddressBlur';



function BeneficialProfileEdit({ data, totals }: { data: BeneficialIProps, totals: TotalsIProps }) {

    const { id, username, name, photoUrl, about, village, district, policeStation, occupation, phone, beneficialDonorId, nidFront, nidBack } = data;

    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex md:flex-row flex-col justify-between gap-3 px-2">
                <div className="basis-3/12 border-[2px] h-60 p-2 flex justify-around relative rounded-xl shadow-sm transition-all duration-200">
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
                                        className="object-cover h-56 rounded-lg w-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-gray-200 text-blue-900 font-extrabold rounded-full shadow-md" />
                        <CarouselNext className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-gray-200 text-blue-900 font-extrabold rounded-full shadow-md" />
                    </Carousel>
                </div>

                <div className="basis-5/12 border-[2px] rounded-xl h-60 shadow-sm transition-all duration-200 p-1 px-2 flex flex-col justify-around">
                    <h2 className="font-semibold text-xl py-1 text-color-main">
                        {data.name}
                    </h2>
                    <AddressBlur address={village} />
                    <h2 className="font-normal text-[15px] text-color-main">
                        <span className="font-semibold mr-2">পেশা:</span>
                        {data.occupation}
                    </h2>
                    <h2 className="font-normal text-[15px] text-color-main">
                        <span className="font-semibold mr-2">মোট খরচ :</span>
                        {totals.totalSpend}
                    </h2>

                    <PhoneDisplay phone={phone} />
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