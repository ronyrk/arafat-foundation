"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getSearchBranch(query: string) {
	unstable_noStore();
	if (query === "all") {
		const result = await prisma.branch.findMany();
		return result;
	}
	const result = await prisma.branch.findMany({
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
		}
	})
	return result;
};