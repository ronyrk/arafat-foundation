import React, { Suspense } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableFooter } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { unstable_noStore } from 'next/cache';
import { FilterSkeleton, LoadingFallback } from '@/components/FilterSkeleton';
import Pagination from '@/components/beneficial-pagination';
import { getBeneficialDonorData } from '@/lib/getBeneficialDonorData';
import BeneficialDonorList from '@/components/BeneficialDonorList';
import FilterControlsDonor from '@/components/FilterControlsDonor';

interface PageProps {
    searchParams?: {
        search?: string;
        page?: string;
    };
}

// Wrapper component to handle async location options
async function FilterControlsWrapper() {

    return <FilterControlsDonor />;
}



export default async function Page({ searchParams }: PageProps) {
    unstable_noStore();

    const { data, pagination } = await getBeneficialDonorData(searchParams || {});

    return (
        <div className="flex flex-col space-y-1 p-2">
            <Suspense fallback={<FilterSkeleton />}>
                <FilterControlsWrapper />
            </Suspense>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 ">
                            <TableHead className="font-semibold ">Profile & Details</TableHead>
                            <TableHead className="font-semibold ">Total Amount</TableHead>
                            <TableHead className="font-semibold ">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Suspense fallback={<LoadingFallback />}>
                        <BeneficialDonorList data={data} />
                    </Suspense>
                    <TableFooter>
                        <TableRow>
                            <TableHead colSpan={6}>
                                <Pagination
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    hasNext={pagination.hasNext}
                                    hasPrev={pagination.hasPrev}
                                />
                            </TableHead>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}