import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async (request: Request, { params }: {
	params: {
		username: string
	}
}) => {
	try {
		const { username } = params;
		const result = await prisma.member.findMany({ where: { branch: username } })
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Server Error");
	}
};