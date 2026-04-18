import { LoginIProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET!;

export const dynamic = "force-dynamic";

const USER_SELECT = {
	username: true,
	email: true,
	photoUrl: true,
	status: true,
	password: true,
} as const;

const errorResponse = (message: string, status = 400) =>
	NextResponse.json({ message }, { status });

const signToken = (payload: { status: string; username: string }) =>
	JWT.sign(payload, SECRET_KEY, { expiresIn: "1h" });

type UserRecord = {
	username: string;
	email: string;
	photoUrl: string | string[];
	status: string;
	password: string;
};

const handleLogin = async (
	user: UserRecord,
	password: string
): Promise<NextResponse> => {
	if (user.password !== password)
		return errorResponse("Your password is incorrect", 401);

	const token = signToken({ status: user.status, username: user.username });

	(await cookies()).set("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60,
		path: "/",
	});

	const { password: _, ...safeUser } = user;
	return NextResponse.json(safeUser, { status: 200 });
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	try {
		const body: LoginIProps = await request.json();
		const { email, password } = body;

		if (!email || !password)
			return errorResponse("Email and password are required.", 400);

		const [branch, donor] = await Promise.all([
			prisma.branchList.findUnique({ where: { email }, select: USER_SELECT }),
			prisma.donorList.findUnique({ where: { email }, select: USER_SELECT }),
		]);

		const user = branch ?? donor;

		if (!user) return errorResponse("Invalid email or password.", 401);

		return await handleLogin(user, password);
	} catch (error) {
		console.error("[LOGIN_ERROR]", error);
		return errorResponse("Internal server error.", 500);
	}
};