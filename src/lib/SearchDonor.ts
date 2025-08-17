import prisma from '@/lib/prisma';
import { BeneficialDonorIProps, DonorIProps } from '@/types';

interface FilterParams {
	search?: string;
	page?: string;
}

export async function getDonorData(params: FilterParams) {
	const { search = "", page = "1" } = params;
	const pageSize = 10;
	const skip = (Number(page) - 1) * pageSize;

	// Build where clause dynamically
	const whereClause: any = {};


	// Search filter - searches across multiple fields
	if (search && search !== 'all' && search.trim() !== '') {
		whereClause.OR = [
			{ name: { contains: search, mode: 'insensitive' } },
			{ username: { contains: search, mode: 'insensitive' } },
			{ code: { contains: search, mode: 'insensitive' } },
			{ mobile: { contains: search, mode: 'insensitive' } },
			{ lives: { contains: search, mode: 'insensitive' } }
		];
	}

	try {
		const [donor, totalCount] = await Promise.all([
			prisma.donor.findMany({
				where: whereClause,

				skip,
				take: pageSize,
				orderBy: [
					{
						code: 'asc' // Within each group, order by creation date (newest first)
					}
				]
			}),
			prisma.donor.count({
				where: whereClause
			})
		]);

		return {
			data: donor as DonorIProps[],
			pagination: {
				currentPage: Number(page),
				totalPages: Math.ceil(totalCount / pageSize),
				totalCount,
				hasNext: Number(page) * pageSize < totalCount,
				hasPrev: Number(page) > 1
			}
		};
	} catch (error) {
		console.error('Error fetching beneficial data:', error);
		return {
			data: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalCount: 0,
				hasNext: false,
				hasPrev: false
			}
		};
	}
};