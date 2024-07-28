import prisma from "@/lib/prisma"
import { ExpensesIProps } from "@/types";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const startString = url.searchParams.get("from");
	const start = new Date(startString as any);
	const page = url.searchParams.get("page");
	const pageNumber = Number(page) - 1;
	const take = 20;
	const skip = take * pageNumber;
	console.log({ startString })
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
			start.setHours(start.getHours() - start.getTimezoneOffset());
			start.setMinutes(start.getMinutes() - start.getTimezoneOffset());
			const time = start.toISOString().slice().slice(0, -1) + '+00:00';
			console.log(time, "2024-07-17T07:00:00.000+00:00");
			const result = await prisma.expenses.findMany({
				where: {
					date: {
						equals: time
					}
				},
				skip,
				take,
				orderBy: {
					date: "desc"
				}
			});
			console.log(start, "date")
			return NextResponse.json(result)
		}

	} catch (error) {
		return NextResponse.json("server Error");
	}

};

export const POST = async (request: Request) => {
	try {
		const body: ExpensesIProps = await request.json();
		const { amount, description, date } = body;
		const result = await prisma.expenses.create({
			data: {
				amount, description, date
			}
		});
		return NextResponse.json({ message: "Successfully expenses Created", result }, { status: 201 });
	} catch (error: any) {
		if (error?.code === 'P2002') {
			return NextResponse.json({ message: `a new user cannot be created with this ${error?.meta?.target}` });
		}
		return NextResponse.json({ message: "Expenses Created Failed" });
	}
}