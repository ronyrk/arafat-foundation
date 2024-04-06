import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	try {
		const result = await prisma.category.findMany();
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Data fetch Fail");
	}
}