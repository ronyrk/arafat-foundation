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

async function fetchBeneficial(username: string): Promise<BeneficialIProps | null> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/beneficial/${username}`,
            {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching beneficial donor:', error);
        return null;
    }
}


export default async function Beneficial({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    const data = await fetchBeneficial(username);

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
