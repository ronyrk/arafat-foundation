"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getProjectSingle(username: string) {
	unstable_noStore();
	const result = await prisma.project.findUnique({
		where: {
			username
		}
	});
	return result;
}