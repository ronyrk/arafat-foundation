"use server";
import { unstable_noStore } from "next/cache";
import prisma from "./prisma";

export async function getSearchBorrowers(query: string, page: string) {
	const pageNumber = Number(page) - 1;
	const take = 10;
	const skip = take * pageNumber;

	unstable_noStore();
	if (query === "all") {
		const result = await prisma.loan.findMany({

			orderBy: {
				code: "asc"
			}
		});
		return result;
	}
	const result = await prisma.loan.findMany({

		where: {
			OR: [
				{
					code: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					name: {
						contains: query,
						mode: "insensitive"
					}
				},
				{
					address: {
						contains: query,
						mode: "insensitive"
					}
				}
			]
		},
		orderBy: {
			code: "asc"
		}
	})
	return result;
};

export async function getSearchBorrowersByBranch(page: string, branch: string) {
	const pageNumber = Number(page) - 1;
	const take = 5;
	const skip = take * pageNumber;

	unstable_noStore();
	const result = await prisma.loan.findMany({
		where: {
			branch
		},
		skip,
		take,
		orderBy: {
			code: "asc"
		}
	});

	for (const borrower of result) {
		const paymentList = await prisma.payment.findMany({
			where: {
				loanusername: borrower.username
			}
		});
		const totalDisbursed = paymentList.reduce((total, item) => total + Number(item.loanAmount), Number(borrower.balance));
		const totalPayment = paymentList.reduce((total, item) => total + Number(item.amount), 0);
		const total = totalDisbursed - totalPayment;
	}

	return result;
};