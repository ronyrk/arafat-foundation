import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		return NextResponse.json({ message: "ok" });
	} catch (error) {
		console.log("error");
	}
};