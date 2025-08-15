import React, { Suspense } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableFooter } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBeneficialData, getLocationOptions } from '@/lib/getBeneficialData';
import FilterControls from '@/components/FilterControls';
import BeneficialList from '@/components/BeneficialList';
import { unstable_noStore } from 'next/cache';
import { FilterSkeleton, LoadingFallback } from '@/components/FilterSkeleton';
import Pagination from '@/components/beneficial-pagination';

interface PageProps {
    searchParams?: {
        search?: string;
        district?: string;
        policeStation?: string;
        page?: string;
    };
}

// Wrapper component to handle async location options
async function FilterControlsWrapper({
    locationOptionsPromise
}: {
    locationOptionsPromise: Promise<{ districts: string[], policeStations: { policeStation: string, district: string }[] }>
}) {
    const locationOptions = await locationOptionsPromise;
    return <FilterControls locationOptions={locationOptions} />;
}

export default async function Page({ searchParams }: PageProps) {
    unstable_noStore();

    const { data, pagination } = await getBeneficialData(searchParams || {});
    // Show skeleton while location options are loading
    const locationOptionsPromise = getLocationOptions();

    return (
        <div className="flex flex-col space-y-2 px-2">
            <Suspense fallback={<FilterSkeleton />}>
                <FilterControlsWrapper locationOptionsPromise={locationOptionsPromise} />
            </Suspense>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 ">
                            <TableHead className="font-semibold w-1/3">Profile & Details</TableHead>
                            <TableHead className="font-semibold  w-32">Status</TableHead>
                            <TableHead className="font-semibold ">Donor Info</TableHead>
                            <TableHead className="font-semibold  ">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Suspense fallback={<LoadingFallback />}>
                        <BeneficialList data={data} />
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