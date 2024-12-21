import Image from 'next/image'
import React from 'react'
import icon from '../../../../public/divider.svg';
import prisma from '@/lib/prisma';
import { TeamMemberCard } from '@/components/ui/team-member-card';
import { OwnerIProps } from '@/types';
import { cookies } from 'next/headers';




async function page() {
    cookies();
    const founder = await prisma.owner.findMany({
        where: {
            type: "FOUNDER"
        }
    }) as OwnerIProps[];
    return (
        <div className="container mx-auto px-4 py-12">
            <div className='flex flex-col items-center justify-center gap-2 '>
                <h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">সদস্য গণ</h1>
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
            </div>
            <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {founder.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page