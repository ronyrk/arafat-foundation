"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getNewsSingle(username: string) {
	unstable_noStore();
	const result = await prisma.news.findUnique({
		where: {
			username
		}
	});
	return result;
}