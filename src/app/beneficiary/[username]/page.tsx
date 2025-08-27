import React from 'react'
import prisma from '@/lib/prisma';
import BeneficialProfileEdit from '@/components/beneficial-profile';
import { BeneficialIProps, BeneficialTransactionIProps, TotalsIProps } from '@/types';
import BeneficialTransactionList from '@/components/transaction-list';
import { notFound } from 'next/navigation';

// Optimized calculation functions with error handling
const calculateTotal = (transactions: BeneficialTransactionIProps[], field: string): number => {
    if (!transactions || !Array.isArray(transactions)) return 0;

    return transactions
        .filter((item) => item?.paymentType === field)
        .reduce((total, item) => {
            const amount = parseFloat(item.amount || "0") || 0;
            return total + amount;
        }, 0);
};

const calculateTotals = (transactions: BeneficialTransactionIProps[]): TotalsIProps => {
    const totalDonate = calculateTotal(transactions, 'donate');
    const totalSpend = calculateTotal(transactions, 'spend');
    const totalBalance = totalDonate - totalSpend;
    return { totalDonate, totalSpend, totalBalance };
};


export default async function Beneficial({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const data = await prisma.beneficial.findUnique({
        where: {
            username,
        },
        include: {
            beneficialDonor: true,
            beneficialTransaction: {
                orderBy: {
                    date: 'asc' // Order transactions by creation date (oldest first)
                }
            },
        }
    }) as BeneficialIProps;

    if (!data) {
        notFound();
    }
    const totals = calculateTotals(data.beneficialTransaction || []);

    return (
        <div>
            <BeneficialProfileEdit data={data} totals={totals} />
            <BeneficialTransactionList data={data.beneficialTransaction as BeneficialTransactionIProps[]} />

        </div>
    )
}
