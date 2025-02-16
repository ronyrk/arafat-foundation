import { TeamMemberCard } from '@/components/ui/team-member-card'
import React from 'react'
import prisma from '@/lib/prisma'
import { OwnerIProps } from '@/types';
import MemberCarousel from '@/components/ui/member-carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import icon from '../../../public/divider.svg';
import { cookies } from 'next/headers';

async function page() {
    cookies();
    const single = await prisma.owner.findMany({
        where: {
            position: "Label-1"
        }
    }) as OwnerIProps[];
    const owner = await prisma.owner.findMany({
        where: {
            position: "Label-2"
        }
    }) as OwnerIProps[];
    const owners = owner.slice(1);
    const founder = await prisma.owner.findMany({
        where: {
            position: "Label-3"
        }
    }) as OwnerIProps[];
    const advisor = await prisma.owner.findMany({
        where: {
            position: "Label-4"
        }
    }) as OwnerIProps[];
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="space-y-12">
                <div className='flex flex-col items-center justify-center gap-2 '>
                    <h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">আমাদের টিম </h1>
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
                </div>
                {/* Featured Team Member */}
                <div className="max-w-[350px] mx-auto">
                    <TeamMemberCard {...single[0]} />
                </div>
                <MemberCarousel data={owners} />
                <div className="flex justify-center py-4">
                    <Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
                        <Link href={`/team-member/board-of-directors`}>আরো দেখুন</Link>
                    </Button>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 '>
                    <h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">সদস্য গণ</h1>
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
                </div>
                {/* Advisor Grid */}
                <MemberCarousel data={founder} />
                <div className="flex justify-center py-4">
                    <Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
                        <Link href={`/team-member/members`}>আরো দেখুন</Link>
                    </Button>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 '>
                    <h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">উপদেষ্টগন</h1>
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
                </div>
                <MemberCarousel data={advisor} />
                <div className="flex justify-center py-4">
                    <Button size={"lg"} className='text-black bg-white border-2 border-black  hover:border-color-sub hover:bg-color-sub hover:text-white' asChild>
                        <Link href={`/team-member/advisors`}>আরো দেখুন</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page