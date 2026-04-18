"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

const SEARCH_FIELDS = ["code", "district", "address", "branchName"] as const;

export async function getSearchBranch(query: string, page: string) {
	unstable_noStore();

	const take = 10;
	const skip = take * (Number(page) - 1);
	const orderBy = { code: "asc" as const };

	const where =
		query === "all"
			? {}
			: {
				OR: SEARCH_FIELDS.map((field) => ({
					[field]: { contains: query, mode: "insensitive" as const },
				})),
			};

	return prisma.branchList.findMany({ take, skip, where, orderBy });
}