import React, { Suspense } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { unstable_noStore } from 'next/cache';
import { FaqIProps } from '@/types';
import { cookies } from 'next/headers';


async function htmlConvert(data: string) {
	const jsonAndHtml = data.split("^");
	const html = jsonAndHtml[0];
	return (
		<div className="py-2">
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}

async function Question() {
	unstable_noStore();
	let res = await fetch('https://af-admin.vercel.app/api/faq');
	if (!res.ok) {
		throw new Error("Failed to fetch data list");
	};
	const data: FaqIProps[] = await res.json();

	return (
		<Accordion type="single" collapsible>
			{
				data.map((item, index) => (
					<AccordionItem className=' hover:bg-[#EAEAF5]' key={index} value={index.toString()}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>
							{htmlConvert(item.description)}
						</AccordionContent>
					</AccordionItem>
				))
			}
		</Accordion>
	)
}

function page() {
	cookies();
	return (
		<div className='p-1 bg-[#F3F3F3] border-2 rounded'>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Question />
			</Suspense>
		</div>
	)
}

export default page