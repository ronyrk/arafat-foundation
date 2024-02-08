import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";



export const GET = async () => {
	try {
		const result = await prisma.donor.findMany();
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ message: "error" });
	}
};