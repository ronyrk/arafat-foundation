"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface PaginationPartProps {
    item: number;       // records per page
    data: number;       // total records
    currentPage: number;
    totalPages: number;
}

export default function BorrowersPagination({
    item,
    data,
    currentPage,
    totalPages,
}: PaginationPartProps) {
    const pathname = usePathname();

    function pageHref(p: number) {
        return `${pathname}?page=${p}`;
    }

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const range: (number | "…")[] = [];
        const left = Math.max(2, currentPage - 1);
        const right = Math.min(totalPages - 1, currentPage + 1);
        range.push(1);
        if (left > 2) range.push("…");
        for (let i = left; i <= right; i++) range.push(i);
        if (right < totalPages - 1) range.push("…");
        range.push(totalPages);
        return range;
    }, [currentPage, totalPages]);

    // Don't render anything if only 1 page
    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? pageHref(currentPage - 1) : "#"}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {pageNumbers.map((p, idx) =>
                    p === "…" ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink className="text-black" href={pageHref(p)} isActive={p === currentPage}>
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? pageHref(currentPage + 1) : "#"}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}