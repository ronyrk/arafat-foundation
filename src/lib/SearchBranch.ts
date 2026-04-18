"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getSearchBranch(query: string, page: string) {
	const pageNumber = Number(page) - 1;
	const take = 10;
	const skip = take * pageNumber;
	unstable_noStore();
	if (query === "all") {
		const result = await prisma.branchList.findMany({
			take,
			skip,
			orderBy: {
				code: "asc"
			}
		});
		return result;
	}
	const result = await prisma.branchList.findMany({
		take,
		skip,
		where: {
			OR: [
				{
					code: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					district: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					address: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					branchName: {
						contains: query,
						mode: "insensitive"
					}
				}
			]
		},
		orderBy: {
			code: "asc"
		}
	})
	return result;
};