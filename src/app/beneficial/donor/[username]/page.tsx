import { cookies } from 'next/headers'
import React, { Suspense } from 'react'
import prisma from '@/lib/prisma';
import { BeneficialDonorIProps, BeneficialTransactionIProps } from '@/types';
import BeneficialDonorProfileEdit from '@/components/beneficial-donor-profile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BeneficialTransactionList from '@/components/transaction-list';
import { notFound } from 'next/navigation';



async function page({ params }: { params: Promise<{ username: string }> }) {
    cookies();
    const { username } = await params;
    const beneficialDonor = await prisma.beneficialDonor.findUnique({
        where: { username },
        include: {
            beneficialTransaction: true
        }
    }) as BeneficialDonorIProps;

    if (!beneficialDonor) {
        notFound();
    }

    return (
        <div>
            <BeneficialDonorProfileEdit data={beneficialDonor} />
            <BeneficialTransactionList data={beneficialDonor.beneficialTransaction as BeneficialTransactionIProps[]} />
        </div>
    )
}

export default page