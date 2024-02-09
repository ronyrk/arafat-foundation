import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

interface LoanProps {
	username: string,
	loanusername: string,
	id: string,
}
interface ParamsIProps {
	params: LoanProps
};

export const dynamic = 'force-dynamic'

export const GET = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { id } = params;
		const result = await prisma.payment.findUnique({ where: { id } });
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Server Error");
	}
};

export const DELETE = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { id } = params;
		await prisma.payment.delete({ where: { id } });
		return NextResponse.json({ message: "Deleted Successfully" });
	} catch (error) {
		throw new Error("Server Error");
	}
};