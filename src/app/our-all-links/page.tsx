import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { unstable_noStore } from 'next/cache'

async function page() {
    unstable_noStore();
    const website = await prisma.all_links.findMany({
        where: {
            type: "website"
        }
    });
    const media = await prisma.all_links.findMany({
        where: {
            type: "media"
        }
    });
    const application = await prisma.all_links.findMany({
        where: {
            type: "application"
        }
    });
    return (
        <div className='md:px-20 md:py-4 p-4'>
            <div className=" flex justify-center items-center my-4">
                <h2 className=" w-fit text-center text-2xl  font-semibold rounded border-dashed border-color-main border-2 uppercase px-4 py-2">OUR ALL LINK</h2>
            </div>
            <div className="border-[1px]  rounded-md p-2 my-2 ">
                <div className="flex items-center justify-center py-4  ">
                    <h2 className=" w-fit text-center text-lg  font-semibold rounded border-dashed border-color-main border-2 uppercase px-3 py-1">Website</h2>
                </div>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            website.map((item, index: number) => (
                                <Button key={index} className=' bg-color-main text-white' asChild>
                                    <Link href={item.path}>{item.name}</Link>
                                </Button>
                            ))
                        }
                    </div>
                </Suspense>
            </div>
            <div className="border-[1px]  rounded-md p-2 my-2 ">
                <div className="flex items-center justify-center py-4  ">
                    <h2 className=" w-fit text-center text-lg  font-semibold rounded border-dashed border-color-main border-2 uppercase px-3 py-1">Social Media</h2>
                </div>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            media.map((item, index: number) => (
                                <Button key={index} className=' bg-color-main text-white' asChild>
                                    <Link href={item.path}>{item.name}</Link>
                                </Button>
                            ))
                        }
                    </div>
                </Suspense>
            </div>
            <div className="border-[1px]  rounded-md p-2 my-2 ">
                <div className="flex items-center justify-center py-4  ">
                    <h2 className=" w-fit text-center text-lg  font-semibold rounded border-dashed border-color-main border-2 uppercase px-3 py-1">Application</h2>
                </div>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            application.map((item, index: number) => (
                                <Button key={index} className=' bg-color-main text-white' asChild>
                                    <Link href={item.path}>{item.name}</Link>
                                </Button>
                            ))
                        }
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default page