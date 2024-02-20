declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_AWS_S3_REGION: string;
		NEXT_AWS_S3_ACCESS_KEY_ID: string;
		NEXT_AWS_S3_SECRET_ACCESS_KEY: string;
		NEXT_AWS_S3_BUCKET_NAME: string;
	}
}