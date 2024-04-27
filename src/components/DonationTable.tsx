import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { unstable_noStore } from 'next/cache';
import { SponsorProps } from '@/types';
import moment from 'moment';
import { TotalSumChildDonation } from '@/lib/totalSum';

async function DonationTable({ username }: { username: string }) {
  unstable_noStore();
  let res = await fetch(`https://af-admin.vercel.app/api/donation/${username}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data list");
  };
  const data: SponsorProps[] = await res.json();
  // console.log(data, "table");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase">Date</TableHead>
          <TableHead className='w-[300px] uppercase'>Donor Name</TableHead>
          <TableHead className='w-[180px] uppercase'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium uppercase">{`${moment(item.createAt).format('DD/MM/YYYY')}`}</TableCell>
            <TableCell className="font-medium uppercase">{item.name}</TableCell>
            <TableCell className="font-medium uppercase">BDT= {item.amount} /=</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className=' text-center uppercase' colSpan={2}>Total</TableCell>
          <TableCell className="uppercase text-base font-semibold text-color-main">BDT= {TotalSumChildDonation(username)} /=</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default DonationTable