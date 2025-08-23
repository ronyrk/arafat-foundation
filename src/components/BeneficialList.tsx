import React, { memo } from 'react';
import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { BeneficialIProps } from '@/types';

interface BeneficialListProps {
    data: BeneficialIProps[];
    currentPage: number;
    itemsPerPage: number;
}

function getStatus(item: BeneficialIProps): string {
    return item.beneficialDonorId ? "Active" : "Inactive";
}

const BeneficialRow = memo(({ item, index }: { item: BeneficialIProps; index: number }) => (
    <TableRow className="hover:bg-gray-50 transition-colors">
        {/* Index Column */}
        <TableCell className="font-medium py-2 text-center">
            <div className="flex items-center justify-start min-h-[80px]">
                <span className="text-base text-gray-700 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    {index}
                </span>
            </div>
        </TableCell>

        <TableCell className="font-medium p-1 md:p-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-h-[80px]">
                {/* Image */}
                <div className="flex-shrink-0">
                    <Image
                        src={item.photoUrl?.[0] || '/placeholder-image.jpg'}
                        alt={item.name || 'Beneficiary'}
                        width={60}
                        height={60}
                        priority
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md blur-[5px] object-cover border-2 border-gray-200"
                    />
                </div>

                {/* Personal Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 truncate">
                            {item.name}
                        </h3>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-0 md:gap-2 text-sm">
                                <span className="text-gray-500">🏠</span>
                                <span className="font-medium text-gray-700 truncate">{item.village}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TableCell>

        <TableCell className="font-medium p-1">
            <div className="flex flex-col items-start gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatus(item) === 'Active'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                    {getStatus(item) === 'Active' ? '✅' : '⚠️'}
                    {getStatus(item)}
                </span>
            </div>
        </TableCell>

        <TableCell className="font-medium px-2">
            <Button className='bg-color-sub' size={"sm"} asChild>
                <Link prefetch={false} href={`/beneficiary/${item.username}`}>DETAILS</Link>
            </Button>
        </TableCell>
    </TableRow>
));

BeneficialRow.displayName = 'BeneficialRow';

const BeneficialList = memo(({ data, currentPage, itemsPerPage }: BeneficialListProps) => {

    const startIndex = (currentPage - 1) * itemsPerPage + 1;

    return (
        <TableBody>
            {data.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-gray-400">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.01-5.824-2.562M15 6.306A7.962 7.962 0 0112 5c-2.34 0-4.29 1.01-5.824-2.562" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-lg font-medium">No beneficiaries found</p>
                                <p className="text-gray-400 text-sm">Try adjusting your search criteria or clear all filters</p>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            ) : (
                data.map((item, arrayIndex) => (
                    <BeneficialRow
                        key={item.id}
                        item={item}
                        index={startIndex + arrayIndex}
                    />
                ))
            )}
        </TableBody>
    );
});

BeneficialList.displayName = 'BeneficialList';

export default BeneficialList;