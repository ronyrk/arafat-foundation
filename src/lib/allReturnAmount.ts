"use server";
import prisma from "./prisma";

import { DonorPaymentIProps } from "@/types";
import { unstable_noStore } from "next/cache";

export const allReturnAmount = async (status: string, username: string) => {
	unstable_noStore();

	const paymentList = await prisma.donorPayment.findMany({
		where: {
			donorUsername: username
		}
	}) as DonorPaymentIProps[];

	if (status === "LEADER") {
		let returnStringArray: string[] = [];
		paymentList.forEach((item) => returnStringArray.push(item.loanPayment as string));
		const returnNumberArray = returnStringArray.map(Number);
		const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return `${total}`;
	} else {
		return 'N/A'
	}
}