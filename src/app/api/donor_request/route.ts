import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { name, phone, lives, hometown, amount, method, imageUpload, about, time } = body;

        await prisma.donor_request.create({
            data: {
                name,
                phone,
                lives,
                hometown,
                amount,
                method,
                photoUrl: imageUpload, // Assuming imageUpload is a URL or base64 string
                about,
                return_date: time,
            },
        });

        // Return a success response
        return NextResponse.json({
            success: true,
            message: "New form data processed successfully",
        })
    } catch (error) {
        console.error("Error processing NEW form:", error)

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
