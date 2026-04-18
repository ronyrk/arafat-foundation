"use server";
// components/BorrowersList.tsx

import React, { Suspense } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { BranchIProps } from "@/types";
import { Loader2 } from "lucide-react";
import BorrowersTable from "./BorrowersTable";

interface BorrowersListProps {
	data: BranchIProps;
	page: string;
	pagination: any;
}

export default async function BorrowersList({ data, page }: BorrowersListProps) {
	return (
		<div className="p-2">
			<Accordion type="single" className="py-1" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-lg font-medium text-color-main">
						ঋণ গ্রহীতার লিস্ট
					</AccordionTrigger>
					<AccordionContent>
						{/*
              Suspense is required here because BorrowersTable is a client
              component that uses useSearchParams internally.
            */}
						<Suspense
							fallback={
								<div className="flex items-center justify-center py-10">
									<Loader2 className="h-6 w-6 animate-spin text-color-main" />
								</div>
							}
						>
							<BorrowersTable
								branchUsername={data.username}
								branchName={data.branchName}
							/>
						</Suspense>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}