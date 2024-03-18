"use server";

export async function getStatus(status: string) {
	if (status === "LEADER") {
		return "LENDER"
	} else {
		return status
	}
};