import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { unstable_noStore } from 'next/cache'
import { DisbursementIProps } from '@/types'
import moment from 'moment'

async function htmlConvert(data: string) {
  return (
    <div className="py-2">
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  )
}


async function DisbursementTable({ username }: { username: string }) {
  unstable_noStore();
  let res = await fetch(`https://af-admin.vercel.app/api/disbursement/${username}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data list");
  };
  const data: DisbursementIProps[] = await res.json();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase">Disbursement Date</TableHead>
          <TableHead className="uppercase">Amount</TableHead>
          <TableHead className="uppercase">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium uppercase">{`${moment(item.date).subtract(1, "years").format('DD/MM/YYYY')}`}</TableCell>
            <TableCell className="font-medium uppercase">BDT= {item.amount} /=</TableCell>
            <TableCell className="font-medium uppercase">
              <Dialog>
                <DialogTrigger>
                  <Button className='bg-color-sub' size={"sm"}>
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className='p-8 bg-white'>
                  <DialogHeader>
                    <DialogDescription>
                      {
                        htmlConvert(item.description)
                      }
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DisbursementTable