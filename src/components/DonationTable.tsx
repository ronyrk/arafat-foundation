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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

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
          <TableHead className="uppercase">Donation Date</TableHead>
          <TableHead className='w-[300px] uppercase'>Donor Name</TableHead>
          <TableHead className="uppercase">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium uppercase">{`${moment(item.createAt).subtract(1, "years").format('DD/MM/YYYY')}`}</TableCell>
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