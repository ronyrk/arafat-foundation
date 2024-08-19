import { DonateProps, LoanIProps } from "@/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Loan Created
export const POST = async (request: Request) => {
	try {
		const body: DonateProps = await request.json();
		const { name, email, amount, photoUrl, about, method, type, transaction, sendNumber, projectName } = body;
		const result = await prisma.donate.create({
			data: {
				name, email, amount, photoUrl, about, method, type, sendNumber, transaction, projectName
			}
		});
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ error });
	}
};

// All Loan
export const GET = async (request: Request) => {
	try {
		const loan = await prisma.donate.findMany();
		return NextResponse.json(loan);
	} catch (error) {
		throw new Error("Server Error");
	}
}