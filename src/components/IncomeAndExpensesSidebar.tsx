"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function IncomeAndExpensesSidebar() {
    const pathname = usePathname();
    const routes = pathname.split('/');
    const subRoutes = routes.at(2);
    return (
        <div className='flex flex-col bg-[#F1F1FA] border-2 rounded'>
            <Link prefetch={false} className={` pl-4 py-3 text-[15px] font-semibold rounded-md ${pathname === "/details-of-income-and-expenses" ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href="/details-of-income-and-expenses">Expenses</Link>
            <Link prefetch={false} className={` pl-4 py-3 text-[15px] font-semibold rounded-md ${pathname === "/details-of-income-and-expenses/income" ? "bg-color-main text-white" : " text-black  hover:bg-[#DDDCF0] hover:text-black"}`} href="/details-of-income-and-expenses/income">Income</Link>
        </div>
    )
}

export default IncomeAndExpensesSidebar

