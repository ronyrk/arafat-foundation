import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { amount, time, username, method } = body;

        await prisma.donor_payment_request.create({
            data: {
                amount,
                return_date: time,
                username,
                method,
            },
        });
        // Return a success response
        return NextResponse.json({
            success: true,
            message: "Old form data processed successfully",
        })
    } catch (error) {
        console.error("Error processing OLD form:", error)

        // Return an error response
        return NextResponse.json(
            {
                success: false,
                message: "Failed to process form data",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
