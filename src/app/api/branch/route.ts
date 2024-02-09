import prisma from "@/lib/prisma"
import { BranchIProps } from "@/types";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export const GET = async () => {
	try {
		const result = await prisma.branch.findMany();
		return NextResponse.json(result);
	} catch (error) {
		throw new Error("Server Error");
	}
};

export const POST = async (request: Request) => {
	try {
		const body: BranchIProps = await request.json();
		const { name, username, email, password, village, policeStation, postOffice, psFatherName, psName, psPhone, address, district, mosjid } = body;
		console.log(body);
		const result = await prisma.branch.create({
			data: {
				username, email, password, village, district, policeStation, postOffice, psName, psFatherName, psPhone, address, name, mosjid
			}
		});
		return NextResponse.json({ message: "Successfully Branch Created", result }, { status: 201 });
	} catch (error) {
		// throw new Error("Server Error");
		return NextResponse.json({ message: error });
	}
}