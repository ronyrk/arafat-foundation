import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface LoanProps {
	username: string,
	loanusername: string,
}
interface ParamsIProps {
	params: LoanProps
}

export const GET = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { username, loanusername } = params;
		const info = await prisma.loan.findUnique({ where: { username: loanusername } })
		return NextResponse.json({ info });
	} catch (error) {
		console.log(error);
	}
}