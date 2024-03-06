import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface LoanProps {
	username: string,
	loanusername: string,
}
interface ParamsIProps {
	params: LoanProps
}

export const dynamic = 'force-dynamic'

export const GET = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { username, loanusername } = params;
		const [info, paymentList] = await Promise.all([
			prisma.loan.findUnique({ where: { username: loanusername } }),
			prisma.payment.findMany({ where: { loanusername } })
		]);
		return NextResponse.json({ info, paymentList });
	} catch (error) {
		// console.log(error);
		throw new Error("Data fetch Error");
	}
};