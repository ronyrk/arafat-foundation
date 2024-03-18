"use server";

import { DonorPaymentIProps } from "@/types";
import { unstable_noStore } from "next/cache";

export const allReturnAmount = async (status: string, username: string) => {
	unstable_noStore();
	const response = await fetch(`https://arafatfoundation.vercel.app/api/donor_payment/donor/${username}`);
	if (!response.ok) {
		throw new Error("Failed fetch Data");
	};
	const paymentList: DonorPaymentIProps[] = await response.json();
	if (status === "LEADER") {
		const returnArray = paymentList.filter((item) => item.type === "return");
		let returnStringArray: string[] = [];
		returnArray.forEach((item) => returnStringArray.push(item.loanPayment));
		const returnNumberArray = returnStringArray.map(Number);
		const totalReturn = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		return totalReturn;
	} else {
		return 'N/A'
	}
}