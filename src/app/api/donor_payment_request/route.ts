import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json()

        // Here you would typically process the data
        // For example, save to a database, call another API, etc.
        console.log("Processing OLD form data:", body)

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000))

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
