import prisma from '@/lib/prisma';
import { LoanIProps } from '@/types';
import { unstable_noStore } from 'next/cache';

interface FilterParams {
	search?: string;
	page?: string;
	pageSize?: string;
}

interface PaginationResult {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	hasNext: boolean;
	hasPrev: boolean;
	pageSize: number;
}

interface SearchResult {
	data: LoanIProps[];
	pagination: PaginationResult;
}

export async function getBorrowerSearchData(params: FilterParams): Promise<SearchResult> {
	// Disable caching for real-time data
	unstable_noStore();

	const {
		search = "",
		page = "1",
		pageSize: paramPageSize = "10"
	} = params;

	// Validate and sanitize inputs
	const currentPage = Math.max(1, parseInt(page) || 1);
	const itemsPerPage = Math.min(50, Math.max(1, parseInt(paramPageSize) || 10)); // Limit max page size
	const skip = (currentPage - 1) * itemsPerPage;
	const searchTerm = search?.trim() || "";

	// Build where clause with optimized search
	const whereClause: any = {
		// Add any default filters here if needed
	};

	// Optimized search filter
	if (searchTerm && searchTerm !== 'all' && searchTerm.length > 0) {
		// For better performance, use more specific search patterns
		if (searchTerm.length <= 2) {
			// For short searches, be more restrictive to avoid too many results
			whereClause.OR = [
				{ code: { startsWith: searchTerm, mode: 'insensitive' } },
				{ username: { startsWith: searchTerm, mode: 'insensitive' } }
			];
		} else {
			// For longer searches, use contains
			whereClause.OR = [
				{ name: { contains: searchTerm, mode: 'insensitive' } },
				{ username: { contains: searchTerm, mode: 'insensitive' } },
				{ code: { contains: searchTerm, mode: 'insensitive' } },
				{ phone: { contains: searchTerm, mode: 'insensitive' } },
				// Add email search only if email field exists in schema
				// { email: { contains: searchTerm, mode: 'insensitive' } },
			];
		}
	}

	try {
		// Use Promise.allSettled for better error handling
		const [borrowersResult, totalCountResult] = await Promise.allSettled([
			prisma.loan.findMany({
				where: whereClause,
				skip,
				take: itemsPerPage,
				orderBy: [
					{ code: 'asc' }
				],
				// Select only needed fields for better performance
				select: {
					id: true,
					username: true,
					name: true,
					code: true,
					branch: true,
					address: true,
					about: true,
					disbursed: true,
					recovered: true,
					balance: true,
					form1: true,
					form2: true,
					nidfont: true,
					nidback: true,
					occupation: true,
					phone: true,
					photosUrl: true,
					status: true
				}
			}),
			prisma.loan.count({
				where: whereClause
			})
		]);

		// Handle results
		const borrowers = borrowersResult.status === 'fulfilled'
			? borrowersResult.value as LoanIProps[]
			: [];

		const totalCount = totalCountResult.status === 'fulfilled'
			? totalCountResult.value
			: 0;

		// Log errors if any occurred
		if (borrowersResult.status === 'rejected') {
			console.error('Error fetching borrowers:', borrowersResult.reason);
		}
		if (totalCountResult.status === 'rejected') {
			console.error('Error fetching total count:', totalCountResult.reason);
		}

		// Calculate pagination
		const totalPages = Math.ceil(totalCount / itemsPerPage);
		const hasNext = currentPage < totalPages;
		const hasPrev = currentPage > 1;

		return {
			data: borrowers,
			pagination: {
				currentPage,
				totalPages,
				totalCount,
				hasNext,
				hasPrev,
				pageSize: itemsPerPage
			}
		};

	} catch (error) {
		console.error('Critical error in getBorrowerSearchData:', error);

		// Return safe fallback data
		return {
			data: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalCount: 0,
				hasNext: false,
				hasPrev: false,
				pageSize: itemsPerPage
			}
		};
	}
}


// export async function getSearchBorrowersByBranch(page: string, branch: string) {
// 	const pageNumber = Number(page) - 1;
// 	const take = 5;
// 	const skip = take * pageNumber;

// 	unstable_noStore();
// 	const result = await prisma.loan.findMany({
// 		where: {
// 			branch
// 		},
// 		skip,
// 		take,
// 		orderBy: {
// 			code: "asc"
// 		}
// 	});

// 	return result;
// };

// export async function getSearchBorrowersByBranch(page: string, branch: string) {
// 	const pageNumber = Number(page) - 1;
// 	const take = 5;
// 	const skip = take * pageNumber;

// 	unstable_noStore();
// 	const result = await prisma.loan.findMany({
// 		where: {
// 			branch
// 		},
// 		skip,
// 		take,
// 		orderBy: {
// 			code: "asc"
// 		}
// 	});

// 	return result;
// };