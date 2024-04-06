"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getGallery(query: string) {

	unstable_noStore();
	if (query === "all") {
		const result = await prisma.gallery.findMany();
		return result;
	}
	const result = await prisma.gallery.findMany({
		where: {
			category: {
				contains: query,
				mode: "insensitive"
			}
		}
	})
	return result;
};