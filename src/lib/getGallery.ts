"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getGallery(query: string) {
	unstable_noStore();

	if (query === "all") {
		const result = await prisma.gallery.findMany({
			orderBy: {
				id: "desc"
			}
		});
		return result;
	} else if (query === "video") {
		const result = await prisma.gallery.findMany({
			where: {
				category: query
			},
			orderBy: {
				id: "desc"
			}
		});
		return result;
	} else {
		const result = await prisma.gallery.findMany({
			where: {
				category: query
			},
			orderBy: {
				id: "desc"
			}
		})
		return result;
	}

};