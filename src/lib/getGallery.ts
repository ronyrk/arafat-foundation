// lib/getGallery.ts
"use server";
import prisma from "./prisma";
import { unstable_cache } from "next/cache";

const FOUR_HOURS = 60 * 60 * 4;

const fetchGallery = unstable_cache(
	async (query: string) => {
		const where = query === "all" ? {} : { category: query };
		return prisma.gallery.findMany({
			where,
			orderBy: { id: "desc" },
		});
	},
	["gallery"],                        // cache key prefix
	{ revalidate: FOUR_HOURS, tags: ["gallery"] }
);

export async function getGallery(query: string) {
	return fetchGallery(query);
}