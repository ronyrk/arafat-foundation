/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://arafatfoundation.vercel.app/:path*',
			},
		]
	},
};

export default nextConfig;
