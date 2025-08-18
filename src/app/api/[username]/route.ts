import prisma from "@/lib/prisma";
import { ParamsIProps } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: Request, { params }: ParamsIProps) => {
	try {
		const { username } = params;

		// Validate username parameter
		if (!username || typeof username !== 'string') {
			return NextResponse.json(
				{ error: 'Username is required and must be a string' },
				{ status: 400 }
			);
		}

		// Use Promise.allSettled for parallel queries instead of sequential
		const [branchResult, donorResult] = await Promise.allSettled([
			prisma.branch.findUnique({
				where: { username },
				select: {
					username: true,
					email: true,
					photoUrl: true,
					status: true
				}
			}),
			prisma.donor.findUnique({
				where: { username },
				select: {
					username: true,
					name: true,
					email: true,
					photoUrl: true,
					status: true
				}
			})
		]);

		// Check branch result first
		if (branchResult.status === 'fulfilled' && branchResult.value) {
			return NextResponse.json(branchResult.value);
		}

		// Check donor result
		if (donorResult.status === 'fulfilled' && donorResult.value) {
			return NextResponse.json(donorResult.value);
		}

		// No user found
		return NextResponse.json(
			{ error: 'User not found' },
			{ status: 404 }
		);

	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};