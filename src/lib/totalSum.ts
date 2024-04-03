"use server";

import { DonorPaymentIProps, SponsorProps } from "@/types";
import { unstable_noStore } from "next/cache";

export const TotalSumChildDonation = async (username: string) => {
	unstable_noStore();
	const response = await fetch(`https://af-admin.vercel.app/api/donation/${username}`);
	if (!response.ok) {
		throw new Error("Failed fetch Data");
	};
	const data: SponsorProps[] = await response.json();
	let amountStringArray: string[] = [];
	const Create = data.forEach((item) => amountStringArray.push(item.amount));
	// Convert String Array to Number Array
	let AmountArray = amountStringArray.map(Number);
	const totalAmount = AmountArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	// console.log(totalAmount, 'number array');
	return `${totalAmount}`

}