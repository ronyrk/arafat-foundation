
import { PaymentIProps } from "@/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export const GET = async () => {
	try {
		const result = await prisma.request.findMany();
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Server Error");
	}
};

export const POST = async (request: Request) => {
	try {
		const body: PaymentIProps = await request.json();
		const { loanusername, phone, amount, transactionId } = body;
		const payment = await prisma.request.create({
			data: {
				loanusername, phone, amount, transactionId
			}
		});
		const info = await prisma.loan.findUnique({ where: { username: loanusername } });
		return NextResponse.json({ message: "payment Successfully Added", payment, info });
	} catch (error) {
		return NextResponse.json({ message: error });
	}
};
