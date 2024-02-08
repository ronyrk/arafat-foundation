import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";



export const GET = async () => {
	try {
		const result = await prisma.branch.findMany();
		return NextResponse.json("ok");
	} catch (error) {
		return NextResponse.json({ message: "error" });
	}
};