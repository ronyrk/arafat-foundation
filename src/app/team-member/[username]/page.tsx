import { Share } from '@/components/Share';
import { OwnerIProps, ParamsIProps } from '@/types'
import { unstable_noStore } from 'next/cache';
import React from 'react'
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    params: { username: string }
};

async function htmlConvert(data: string) {
    const jsonAndHtml = data.split("^");
    const html = jsonAndHtml[0];

    return (
        <div className="py-2">
            <p dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}


export async function generateMetadata({ params }: Props) {
    const member = await prisma.owner.findUnique({
        where: {
            username: params.username
        }
    }) as OwnerIProps;
    // console.log(donor, "24");
    return {
        title: member.name,
        description: htmlConvert(member.about),
        openGraph: {
            images: [
                {
                    url: member.photos, // Must be an absolute URL
                    width: 800,
                    height: 600,
                    alt: member.name,
                },
                {
                    url: member.photos, // Must be an absolute URL
                    width: 1800,
                    height: 1600,
                    alt: member.name,
                },
            ],
        },
    };
};


async function page({ params }: ParamsIProps) {
    const { username } = params;
    unstable_noStore();
    const member = await prisma.owner.findUnique({
        where: {
            username: username
        }
    }) as OwnerIProps;

    return (
        <section id='top' className="">
            <div className='flex flex-col gap-3'>
                <div className="flex md:flex-row flex-col justify-between gap-3 px-2">
                    <div className=" basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
                        <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=' rounded-md object-cover' src={member.photos} alt={member.name} width={260} height={140} />
                        <span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] lowercase font-normal p-[2px] rounded">{member.type}</span>
                    </div>
                    <div className="basis-9/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
                        <h2 className=" font-semibold text-xl py-1  text-color-main">{member.name}</h2>
                        <h2 className=" font-semibold text-xl py-1  text-color-main">Phone:- {member.phone}</h2>
                        <Link prefetch={false} className=' text-color-main' href={member.facebook}>Facebook Profile</Link>
                        <Link prefetch={false} className=' text-color-main' href={member.facebook}>Linkedin Profile</Link>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-[16px] font-normal text-color-main">{htmlConvert(member.about)} </h2>
                </div>
                <div className="py-2 px-4">
                    <Share username={member.username} type='team-member' />
                </div>
            </div>
        </section>
    )
}

export default page