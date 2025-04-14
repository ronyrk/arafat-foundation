import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'

// Donor List
export const GET = async () => {
    try {
        const result = await prisma.donor.findMany(
            {
                orderBy: {
                    code: "asc"
                }
            }
        );
        return NextResponse.json(result);
    } catch (error) {
        throw new Error("Server Error");
    }
};