import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const startString = url.searchParams.get("from");
	const start = new Date(startString as any)?.toJSON()?.split("T")[0];
	const page = url.searchParams.get("page");
	const pageNumber = Number(page) - 1;
	const take = 20;
	const skip = take * pageNumber;
	try {
		if (startString === "udd") {
			const result = await prisma.expenses.findMany({
				skip,
				take,
				orderBy: {
					date: "desc"
				}
			});

			return NextResponse.json(result)
		} else {
			const result = await prisma.expenses.findMany({
				where: {
					date: {
						contains: start,
						mode: "insensitive"
					}
				},
				skip,
				take,
				orderBy: {
					date: "desc"
				}
			});
			return NextResponse.json(result)
		}

	} catch (error) {
		console.log(error);
		return NextResponse.json("server Error");
	}

};