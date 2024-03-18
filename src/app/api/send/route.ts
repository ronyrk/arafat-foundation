import { SendEmailIProps } from "@/types";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
	try {
		const body: SendEmailIProps = await request.json();
		const { name, email, phone, message } = body;
		console.log(body);
		return NextResponse.json({ message: "Feedback Sent Successfully" });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Feedback Sent Successfully" });
	}
};