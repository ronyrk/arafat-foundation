"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getDonor(query: string) {
	unstable_noStore();
	if (query === "all") {
		const result = await prisma.donor.findMany();
		return result;
	}
	const result = await prisma.donor.findMany({
		where: {
			OR: [
				{
					code: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					name: {
						contains: query,
						mode: "insensitive"
					}
				},
			]
		}
	})
	return result;
};