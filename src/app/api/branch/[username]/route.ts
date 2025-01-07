import { ParamsIProps } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'
// Single branch
export const GET = async (request: Request, { params }: ParamsIProps) => {
    try {
        const { username } = params;

        const [info, loanList] = await Promise.all([
            prisma.branch.findUnique({ where: { username } }),
            prisma.loan.findMany({ where: { branch: username } }),
        ]);
        return NextResponse.json({ info, loanList });
    } catch (error) {
        throw new Error("Server Error");
    }
};