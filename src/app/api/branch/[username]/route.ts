import { ParamsIProps } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'

export const GET = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { username } = params;
		console.log(username);
		const result = await prisma.branch.findUnique({
			where: {
				username,
			}
		});
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Server Error");
	}
};