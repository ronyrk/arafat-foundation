import { LoanIProps, MemberIProps } from "@/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Loan Created
export const POST = async (request: Request) => {
	try {
		const body: MemberIProps = await request.json();
		const { branch, teamMemberAddress, teamMemberName, teamMemberOccupation, teamMemberPhone, teamMemberPhotoUrl } = body;
		const user = await prisma.member.create({
			data: {
				branch, teamMemberAddress, teamMemberName, teamMemberOccupation, teamMemberPhone, teamMemberPhotoUrl
			}
		})
		return NextResponse.json({ message: "User created Successfully", user });
	} catch (error) {
		return NextResponse.json({ error });
	}
};