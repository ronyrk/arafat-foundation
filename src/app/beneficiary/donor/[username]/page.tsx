import { cookies } from 'next/headers'
import React, { Suspense } from 'react'
import prisma from '@/lib/prisma';
import { BeneficialDonorIProps, BeneficialIProps, BeneficialTransactionIProps, TotalsIProps } from '@/types';
import BeneficialDonorProfileEdit from '@/components/beneficial-donor-profile';
import BeneficialTransactionList from '@/components/transaction-list';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase, BuildingIcon, MapPin, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { LoadingFallback } from '@/components/FilterSkeleton';
import Link from 'next/link';

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


// Memoized BeneficialList component with improved design
const BeneficialList = React.memo(({ data }: { data: BeneficialIProps[] }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Users className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                <p>No beneficial records found</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {data.map((beneficial) => (
                <Card key={beneficial.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                            {/* Enhanced Image Section */}
                            <div className="flex-shrink-0 relative">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                                    <Image
                                        src={beneficial.photoUrl?.at(0) || '/placeholder-avatar.png'}
                                        alt={`${beneficial.name}'s profile`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 96px) 100vw, 96px"
                                        priority={false}
                                    />
                                </div>
                            </div>

                            {/* Enhanced Details Section */}
                            <div className="flex-1 min-w-0 space-y-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                        {beneficial.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{beneficial.occupation}</span>
                                    </div>
                                </div>

                                {/* Location Information Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-green-500" />
                                        <span className="font-medium">{beneficial.village}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BuildingIcon className="h-4 w-4 text-blue-500" />
                                        <span>{beneficial.district}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
                                        <Shield className="h-4 w-4 text-red-500" />
                                        <span>Police Station: {beneficial.policeStation}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Action Button */}
                            <div className="flex-shrink-0">
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                    size="lg"
                                    asChild
                                >
                                    <Link href={`/beneficiary/${beneficial.username}`} className="flex items-center gap-2">
                                        Details
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
});

BeneficialList.displayName = "BeneficialList";



async function page({ params }: { params: Promise<{ username: string }> }) {
    cookies();
    const { username } = await params;
    const beneficialDonor = await prisma.beneficialDonor.findUnique({
        where: { username },
        include: {
            beneficial: true,
            beneficialTransaction: {
                orderBy: {
                    date: 'asc' // Order transactions by creation date (oldest first)
                }
            }
        }
    }) as BeneficialDonorIProps;

    if (!beneficialDonor) {
        notFound();
    }

    const totals = calculateTotals(beneficialDonor.beneficialTransaction || []);

    return (
        <div>
            <BeneficialDonorProfileEdit data={beneficialDonor} totals={totals} />
            {/* Enhanced Beneficial List Section */}
            <Card className="shadow-lg my-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Beneficial Recipients
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="beneficial-list" className="border-0">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        {beneficialDonor.beneficial?.length || 0} Recipients
                                    </Badge>
                                    <span>View All Recipients</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <Suspense fallback={<LoadingFallback />}>
                                    <BeneficialList data={beneficialDonor.beneficial || []} />
                                </Suspense>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <BeneficialTransactionList data={beneficialDonor.beneficialTransaction as BeneficialTransactionIProps[]} />
        </div>
    )
}

export default page