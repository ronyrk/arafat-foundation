"use client";
// components/BorrowersTable.tsx

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BorrowerRow {
    username: string;
    code: string;
    name: string;
    totalDisbursed: number;
    totalRecovered: number;
}

interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

interface BorrowersTableProps {
    branchUsername: string;
    branchName: string;
}

// ─── Formatter ────────────────────────────────────────────────────────────────

function fmt(amount: number) {
    return new Intl.NumberFormat("en-BD", { minimumFractionDigits: 0 }).format(amount);
}

// ─── Skeleton Rows ────────────────────────────────────────────────────────────

function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
                </TableRow>
            ))}
        </>
    );
}

// ─── Pagination Bar ───────────────────────────────────────────────────────────

function PaginationBar({
    current,
    total,
    onChange,
}: {
    current: number;
    total: number;
    onChange: (p: number) => void;
}) {
    if (total <= 1) return null;

    const pages: (number | "…")[] = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        const left = Math.max(2, current - 1);
        const right = Math.min(total - 1, current + 1);
        pages.push(1);
        if (left > 2) pages.push("…");
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < total - 1) pages.push("…");
        pages.push(total);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={current > 1 ? () => onChange(current - 1) : undefined}
                        className={current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {pages.map((p, i) =>
                    p === "…" ? (
                        <PaginationItem key={`e-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink

                                isActive={p === current}
                                onClick={() => onChange(p as number)}
                                className="cursor-pointer text-black"
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={current < total ? () => onChange(current + 1) : undefined}
                        className={current >= total ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BorrowersTable({
    branchUsername,
    branchName,
}: BorrowersTableProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [rows, setRows] = useState<BorrowerRow[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const page = Number(searchParams.get("page") ?? "1");

    const fetchPage = useCallback(
        async (p: number) => {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch(`/api/branch/${branchUsername}?page=${p}`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error("fetch failed");
                const json = await res.json();
                setRows(json.data.borrowers ?? []);
                setMeta(json.pagination);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        },
        [branchUsername]
    );

    useEffect(() => {
        fetchPage(page);
    }, [page, fetchPage]);

    function handlePageChange(p: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(p));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    // ── Render ──────────────────────────────────────────────────────────────────

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-base font-medium text-center">
                {branchName} এর আওতাধীন ঋণ গ্রহীতার লিস্ট
            </h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>CODE</TableHead>
                        <TableHead className="w-[300px]">BORROWERS NAME</TableHead>
                        <TableHead>DISBURSED</TableHead>
                        <TableHead>RECOVERED</TableHead>
                        <TableHead>BALANCE</TableHead>
                        <TableHead>DETAILS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        /* ✅ Skeleton rows replace the table body while fetching */
                        <TableSkeleton rows={5} />
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-destructive text-sm">
                                ডেটা লোড করতে সমস্যা হয়েছে।{" "}
                                <button className="underline" onClick={() => fetchPage(page)}>
                                    আবার চেষ্টা করুন
                                </button>
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                কোনো ঋণ গ্রহীতা পাওয়া যায়নি
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((item) => (
                            <TableRow key={item.username}>
                                <TableCell className="font-medium">{item.code}</TableCell>
                                <TableCell className="font-medium uppercase">{item.name}</TableCell>
                                <TableCell className="font-medium">{fmt(item.totalDisbursed)}</TableCell>
                                <TableCell className="font-medium">{fmt(item.totalRecovered)}</TableCell>
                                <TableCell className="font-medium">
                                    {fmt(item.totalDisbursed - item.totalRecovered)}
                                </TableCell>
                                <TableCell>
                                    <Button className="bg-color-sub" size="sm" asChild>
                                        <Link
                                            prefetch={false}
                                            href={`/karze-hasana/borrowers/${item.username}`}
                                        >
                                            DETAILS
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Skeleton for pagination bar while loading */}
            {loading ? (
                <div className="flex justify-center gap-2 py-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-9 rounded-md" />
                    ))}
                </div>
            ) : (
                meta && (
                    <PaginationBar
                        current={meta.page}
                        total={meta.totalPages}
                        onChange={handlePageChange}
                    />
                )
            )}
        </div>
    );
}