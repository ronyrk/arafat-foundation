import React from 'react';

// Base Skeleton Component
const Skeleton = ({
	className = "",
	animate = true
}: {
	className?: string;
	animate?: boolean;
}) => (
	<div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded ${animate ? 'animate-pulse' : ''
		} ${className}`} />
);

// Shimmer Effect Component
const ShimmerSkeleton = ({ className = "" }: { className?: string }) => (
	<div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
		<div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
	</div>
);

// Hero Carousel Loading
const HeroCarouselLoading = () => (
	<div className="w-full mb-8">
		<div className="relative w-full">
			<ShimmerSkeleton className="w-full md:h-[80vh] h-[45vh] rounded-md" />
			<div className="absolute md:left-24 left-10 md:top-24 top-10 z-30 space-y-4">
				<Skeleton className="md:w-96 w-48 md:h-10 h-6" />
				<Skeleton className="md:w-80 w-40 md:h-10 h-6" />
				<Skeleton className="md:w-72 w-32 md:h-6 h-4" />
				<Skeleton className="md:w-32 w-20 md:h-12 h-8 rounded-md" />
			</div>
			{/* Navigation arrows */}
			<Skeleton className="absolute left-4 top-1/2 w-12 h-12 rounded-full -translate-y-1/2" />
			<Skeleton className="absolute right-4 top-1/2 w-12 h-12 rounded-full -translate-y-1/2" />
		</div>
	</div>
);

// About Section Loading
const AboutLoading = () => (
	<div className="md:px-20 md:py-4 p-4 flex md:flex-row flex-col gap-x-4 gap-y-3 mb-8">
		<div className="basis-2/5">
			<ShimmerSkeleton className="w-full h-64 rounded-sm" />
		</div>
		<div className="basis-3/5 px-1 space-y-4">
			<Skeleton className="w-48 h-8" />
			<Skeleton className="w-20 h-1 bg-color-sub" />
			<div className="space-y-3 pt-6">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Skeleton key={i} className="w-full h-4" />
				))}
				<Skeleton className="w-3/4 h-4" />
			</div>
			<Skeleton className="w-32 h-12 rounded-md" />
			<div className="py-2 flex flex-row md:gap-x-2 gap-x-1">
				{[1, 2, 3].map((i) => (
					<div key={i} className="basis-1/3 bg-gray-100 border shadow-lg py-6 rounded-sm flex justify-center items-center flex-col space-y-3">
						<Skeleton className="w-20 h-20 rounded-full" />
						<Skeleton className="w-16 h-6" />
					</div>
				))}
			</div>
		</div>
	</div>
);

// Child Sponsorship Loading
const ChildSponsorshipLoading = () => (
	<div className="py-2 md:px-20 md:py-4 bg-[#FCFCFD] mb-8">
		<div className="mx-2 space-y-4 text-center">
			<Skeleton className="w-80 h-10 mx-auto" />
			<Skeleton className="w-96 h-6 mx-auto" />
			<Skeleton className="w-72 h-5 mx-auto" />
			<div className="flex justify-center py-4">
				<ShimmerSkeleton className="w-16 h-16" />
			</div>
		</div>

		{/* Carousel Container */}
		<div className="relative mb-6">
			<div className="overflow-hidden">
				<div className="flex gap-4 p-2">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="relative flex-shrink-0 w-64 flex flex-col border-2 rounded-md shadow-md bg-white">
							<div className="relative">
								<ShimmerSkeleton className="w-full h-[260px] rounded" />
								<Skeleton className="absolute top-2 left-2 w-16 h-6 rounded bg-white" />
							</div>
							<div className="w-full px-1 bg-white space-y-2 p-2">
								<Skeleton className="w-32 h-6" />
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<Skeleton className="w-12 h-4" />
										<Skeleton className="w-20 h-4" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="w-12 h-4" />
										<Skeleton className="w-24 h-4" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="w-16 h-4" />
										<Skeleton className="w-32 h-4" />
									</div>
								</div>
								<div className="flex flex-col justify-around gap-2 py-2 md:flex-row">
									<Skeleton className="md:w-[130px] w-full h-10 rounded-sm" />
									<Skeleton className="md:w-[130px] w-full h-10 rounded-sm" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>

		<div className="flex justify-center py-4">
			<Skeleton className="w-32 h-12 rounded-md" />
		</div>
	</div>
);

// Projects Loading
const ProjectsLoading = () => (
	<div className="py-2 md:py-4 bg-[#FCFCFD] mb-8">
		<div className="md:px-20 mx-2 space-y-4 text-center">
			<Skeleton className="w-96 h-10 mx-auto" />
			<Skeleton className="w-80 h-6 mx-auto" />
			<div className="flex justify-center py-4">
				<ShimmerSkeleton className="w-16 h-16" />
			</div>
		</div>

		{/* Carousel Container */}
		<div className="relative mb-6">
			<div className="overflow-hidden px-2">
				<div className="flex gap-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex-shrink-0 w-80 flex flex-col border-2 rounded shadow-md bg-white">
							<ShimmerSkeleton className="w-full h-[260px] rounded" />
							<div className="w-full px-2 bg-white space-y-3 p-3">
								<Skeleton className="w-3/4 h-6" />
								<div className="space-y-2">
									<Skeleton className="w-full h-4" />
									<Skeleton className="w-full h-4" />
									<Skeleton className="w-2/3 h-4" />
								</div>
								<div className="flex justify-between py-2 gap-2">
									<Skeleton className="w-28 h-10 rounded" />
									<Skeleton className="w-24 h-10 rounded border-2" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>

		<div className="flex justify-center py-4">
			<Skeleton className="w-32 h-12 rounded-md" />
		</div>
	</div>
);

// Gallery Loading
const GalleryLoading = () => (
	<section className="bg-[#FCFCFD] mb-8">
		<div className="p-2 md:mx-20 space-y-4">
			<Skeleton className="w-40 h-10 mx-auto" />
			<div className="flex justify-center py-4">
				<ShimmerSkeleton className="w-16 h-16" />
			</div>

			<div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
				{Array.from({ length: 8 }, (_, i) => (
					<div key={i} className="relative">
						<ShimmerSkeleton className="md:w-[280px] md:h-[200px] w-[100px] h-[80px] rounded-md" />
						{/* Dialog trigger effect */}
						<div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors rounded-md cursor-pointer" />
					</div>
				))}
			</div>

			<div className="flex justify-center py-4">
				<Skeleton className="w-32 h-12 rounded-md" />
			</div>
		</div>
	</section>
);

// Blog Loading
const BlogLoading = () => (
	<div className="py-2 md:px-20 md:py-4 bg-[#FCFCFD] mb-8">
		<div className="flex flex-col items-center justify-center gap-2 space-y-4">
			<Skeleton className="w-20 h-8" />
			<ShimmerSkeleton className="w-16 h-16" />
		</div>

		{/* Blog Carousel */}
		<div className="relative py-6">
			<div className="overflow-hidden">
				<div className="flex gap-4 px-2">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
							<ShimmerSkeleton className="w-full h-48" />
							<div className="p-4 space-y-3">
								<Skeleton className="w-3/4 h-6" />
								<div className="space-y-2">
									<Skeleton className="w-full h-4" />
									<Skeleton className="w-full h-4" />
									<Skeleton className="w-2/3 h-4" />
								</div>
								<div className="flex justify-between items-center">
									<Skeleton className="w-24 h-8 rounded" />
									<Skeleton className="w-20 h-4" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>

		<div className="flex justify-center py-4">
			<Skeleton className="w-32 h-12 rounded-md" />
		</div>
	</div>
);

// Floating Loading Indicator
const FloatingLoader = () => (
	<div className="fixed top-4 right-4 z-50 animate-fade-in">
		<div className="flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 shadow-lg border border-gray-200">
			<div className="flex space-x-1">
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className="w-2 h-2 bg-color-main rounded-full animate-bounce"
						style={{
							animationDelay: `${i * 0.15}s`,
							animationDuration: '1s'
						}}
					/>
				))}
			</div>
		</div>
	</div>
);

// Main Loading Component for Next.js
export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<FloatingLoader />

			{/* Hero Carousel */}
			<HeroCarouselLoading />

			{/* About Section */}
			<AboutLoading />

			{/* Child Sponsorship */}
			<ChildSponsorshipLoading />

			{/* Projects */}
			<ProjectsLoading />

			{/* Gallery */}
			<GalleryLoading />

			{/* Blog */}
			<BlogLoading />
		</div>
	);
}