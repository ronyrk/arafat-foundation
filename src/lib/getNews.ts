"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getNews(query: string) {
	unstable_noStore();
	if (query === "all") {
		const result = await prisma.news.findMany({
			orderBy: {
				createAt: "asc"
			}
		});
		return result;
	}
	const result = await prisma.news.findMany({
		where: {
			title: {
				contains: query,
				mode: "insensitive"
			}
		},
		orderBy: {
			createAt: "asc"
		}
	})
	return result;
};