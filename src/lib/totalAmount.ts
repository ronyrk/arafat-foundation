"use server";
import prisma from "./prisma";
import { DonorPaymentIProps } from "@/types";
import { unstable_noStore } from "next/cache";

export const TotalAmount = async (status: string, username: string) => {
	unstable_noStore();

	const paymentList = await prisma.donorPayment.findMany({
		where: {
			donorUsername: username
		}
	})
	const returnArray = paymentList.filter((item) => item.type === "LENDING");
	let returnStringArray: string[] = [];
	returnArray.forEach((item) => returnStringArray.push(item.amount as string));
	const returnNumberArray = returnStringArray.map(Number);
	const total = returnNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	const returnArray2 = paymentList.filter((item) => item.type === "DONATE");
	let returnStringArray2: string[] = [];
	returnArray2.forEach((item) => returnStringArray2.push(item.donate as string));
	const returnNumberArray2 = returnStringArray2.map(Number);
	const donate = returnNumberArray2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	const result = status === "LEADER" ? total : total + donate;

	return result;

}