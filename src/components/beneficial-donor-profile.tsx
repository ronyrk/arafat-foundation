"use client";

import { BeneficialDonorIProps, BeneficialTransactionIProps } from '@/types';
import Image from 'next/image'
import React, { useState } from 'react'
import { Share } from './Share';



function BeneficialDonorProfileEdit({ data }: { data: BeneficialDonorIProps }) {

    const { username, name, photoUrl, about, live, homeTown } = data;


    function calculateTotal(data: BeneficialTransactionIProps[]) {
        return data.reduce((total, transaction) => {
            return total + (parseFloat(transaction.amount) || 0);
        }, 0);
    }


    return (
        <div className='flex flex-col gap-3 relative'>

            <div className="flex md:flex-row flex-col justify-between gap-3 px-2 relative">


                <div className=" basis-4/12 border-[2px] p-2 flex justify-around relative rounded">
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=' rounded-md object-cover' src={data.photoUrl} alt={data.name} width={300} height={140} />

                </div>
                <div className="basis-8/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
                    <h2 className=" font-semibold text-xl py-1  text-color-main"> {name}
                    </h2>
                    <h3 className=" flex flex-row items-center font-normal text-[18px]  text-color-main"><span className="font-semibold mr-2">Home Town : {homeTown}</span>
                    </h3>
                    <h3 className=" flex flex-row items-center font-normal text-[18px]  text-color-main"><span className="font-semibold mr-2">Lives : {live}</span>
                    </h3>

                    <h2 className='text-xl'>Total Donate:- {calculateTotal(data.beneficialTransaction || [])}</h2>

                </div>
            </div>
            <div className="p-2">
                <div className='py-4' dangerouslySetInnerHTML={{ __html: about?.split("^")[0] }} />
            </div>
            <div className="my-2 py-2 px-2">
                <Share username={data.username} type='beneficial/donor' />
            </div>
        </div>
    )
}

export default BeneficialDonorProfileEdit