import { ParamsIdIProps } from "@/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export const GET = async (request: Request, { params }: ParamsIdIProps) => {
	try {
		const { id } = params;
		const info = await prisma.request.findUnique({ where: { id } });
		return NextResponse.json(info);
	} catch (error) {
		throw new Error("Server Error");
	}
};