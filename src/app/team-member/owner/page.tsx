import Image from 'next/image'
import React from 'react'
import icon from '../../../../public/divider.svg';
import prisma from '@/lib/prisma';
import { TeamMemberCard } from '@/components/ui/team-member-card';
import { OwnerIProps } from '@/types';
import { cookies } from 'next/headers';
import { getSearchTeamMemberOwner } from '@/lib/getSearchTeamMember';
import PaginationPart from '@/components/Pagination';




async function Owner({ searchParams }: {
    searchParams?: {
        page?: string,
    }
}) {
    cookies();
    const page = searchParams?.page || "1";
    const length = await prisma.owner.count({ where: { type: "OWNER" } });
    const owner = await getSearchTeamMemberOwner(page);
    const ownerFirst = await prisma.owner.findMany({
        where: {
            type: "OWNER"
        }
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className='flex flex-col items-center justify-center gap-2 '>
                <h1 className="py-2 text-xl font-semibold text-center border-dotted text-color-main">আমাদের টিম </h1>
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={icon} alt='icon' />
            </div>
            <div className="space-y-12">
                <div className="max-w-sm mx-auto">
                    <TeamMemberCard {...ownerFirst[0]} large />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {owner.slice(1).map((member, index) => (
                        <TeamMemberCard key={length} {...member} />
                    ))}
                </div>
                <div className="flex justify-center py-2">
                    <PaginationPart item={10} data={length} />
                </div>
            </div>
        </div>
    )
}

export default Owner