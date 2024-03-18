"use server"
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { SendEmailIProps } from "@/types";


export const sendMail = async ({ email, phone, name, message }: SendEmailIProps) => {
	const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: SMTP_EMAIL,
			pass: SMTP_PASSWORD,
		},
	});
	try {
		const testResult = await transport.verify();
		const sendRequest = await transport.sendMail({
			from: email,
			to: SMTP_EMAIL,
			subject: "Feedback",
			html: message,
		});
		return sendRequest;
	} catch (error) {
		return error;

	}
}