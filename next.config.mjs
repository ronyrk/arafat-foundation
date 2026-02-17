/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60,
	}
};

export default nextConfig;
