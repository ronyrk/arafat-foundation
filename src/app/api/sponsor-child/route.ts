import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Loan Created
export const POST = async (request: Request) => {
	try {
		const body = await request.json();
		const { name, email, amount, photoUrl, about, method, username } = body;
		const result = await prisma.donationChild.create({
			data: {
				name, email, amount, photoUrl, about, method, username
			}
		})
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