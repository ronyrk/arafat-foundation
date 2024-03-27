"use server";
import prisma from "./prisma";

export async function getNewsSingle(username: string) {
	const result = await prisma.news.findUnique({
		where: {
			username
		}
	});
	return result;
}