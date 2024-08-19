import { ChildDonateProps } from "@/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Loan Created
export const POST = async (request: Request) => {
    try {
        const body: ChildDonateProps = await request.json();
        const { name, email, amount, photoUrl, about, method, type, transaction, sendNumber, childName } = body;
        const result = await prisma.childsDonate.create({
            data: {
                name, email, amount, photoUrl, about, method, type, sendNumber, transaction, childName
            }
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error });
    }
};