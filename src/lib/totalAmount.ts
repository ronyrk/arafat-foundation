"use server";

import { DonorPaymentIProps } from "@/types";
import { unstable_noStore } from "next/cache";

export const TotalAmount = async (status: string, username: string, amount: string) => {
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

		const increaseArray = paymentList.filter((item) => item.type === "increase");
		let increaseStringArray: string[] = [];
		increaseArray.forEach((item) => increaseStringArray.push(item.amount));
		const increaseNumberArray = increaseStringArray.map(Number);
		const totalIncrease = increaseNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
		return totalIncrease - totalReturn;
	} else {
		let amountStringArray: string[] = [];
		const Create = paymentList.forEach((item) => amountStringArray.push(item.amount));
		// Convert String Array to Number Array
		let AmountArray = amountStringArray.map(Number);
		const totalAmount = AmountArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		// console.log(totalAmount, 'number array');
		return `${totalAmount}`
	}

}