"use client";
import { memo, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

// Lazy load carousel components to reduce initial bundle size
const Carousel = dynamic(() => import("@/components/ui/carousel1").then(mod => mod.Carousel), {
	ssr: true,
});
const CarouselContent = dynamic(() => import("@/components/ui/carousel1").then(mod => mod.CarouselContent), {
	ssr: true,
});
const CarouselItem = dynamic(() => import("@/components/ui/carousel1").then(mod => mod.CarouselItem), {
	ssr: true,
});
const CarouselNext = dynamic(() => import("@/components/ui/carousel1").then(mod => mod.CarouselNext), {
	ssr: true,
});
const CarouselPrevious = dynamic(() => import("@/components/ui/carousel1").then(mod => mod.CarouselPrevious), {
	ssr: true,
});

// Import Autoplay plugin directly (not as a React component)


// Static data - moved outside component to prevent re-creation on every render
const CAROUSEL_IMAGES = [
	{ src: "/SP1.jpg", alt: "আরাফাত ফাউন্ডেশন সেবা কার্যক্রম ১" },
	{ src: "/SP2.jpg", alt: "আরাফাত ফাউন্ডেশন সেবা কার্যক্রম ২" },
	{ src: "/SP3.jpg", alt: "আরাফাত ফাউন্ডেশন সেবা কার্যক্রম ৩" },
	{ src: "/SP4.jpg", alt: "আরাফাত ফাউন্ডেশন সেবা কার্যক্রম ৪" },
	{ src: "/SP5.jpg", alt: "আরাফাত ফাউন্ডেশন সেবা কার্যক্রম ৫" }
] as const;

// Carousel configuration - memoized to prevent re-creation
const AUTOPLAY_CONFIG = {
	delay: 8000,
	stopOnInteraction: false,
	stopOnMouseEnter: true,
	playOnInit: true,
};

// Memoized carousel item component
type CarouselImage = { src: string; alt: string };

const CarouselItemMemo = memo(({ item, index }: { item: CarouselImage; index: number }) => (
	<CarouselItem key={index} className="relative">
		<div className="">
			<Image
				src={item.src}
				width={1920}
				height={1080}
				className="md:h-[80vh] h-[45vh] object-cover w-full brightness-50 rounded-md"
				sizes="100vw"
				alt={item.alt}
				priority={index === 0} // Prioritize first image for LCP
				quality={85} // Slightly reduce quality for better performance
				placeholder="blur"
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
			/>

			<div className="absolute md:left-24 left-10 md:top-24 top-10 z-30 leading-loose">
				<h2 className="md:text-[40px] text-[12px] font-bold pt-1 text-white">
					সদকা মানুষের বিপদ দূরীভূত করে
				</h2>
				<h2 className="md:text-[40px] text-[18px] font-bold text-white">
					অপমৃত্যু থেকে বাঁচায় এবং পাপ মোচন করে |
				</h2>
				<p className="text-white md:text-xl text-[12px] font-semibold pb-4 pt-2">
					আরাফাত ফাউন্ডেশন একটি রাজনৈতিক এবং অলাভজনক মূলত <br />
					মানব কল্যাণমূলক নিবেদিত সেবামূলক প্রতিষ্ঠান
				</p>
				<Button
					size={"lg"}
					asChild
					className="px-8 py-2 bg-color-sub hover:bg-color-main"
				>
					<Link prefetch={false} prefetch={false} href={"/our-projects"}>
						দান করুন
					</Link>
				</Button>
			</div>
		</div>
	</CarouselItem>
));

CarouselItemMemo.displayName = "CarouselItemMemo";

function HomeCarousel() {
	// Memoize autoplay plugin to prevent re-creation
	const autoplayPlugin = useMemo(() => {
		if (typeof window === 'undefined') return null;
		return Autoplay(AUTOPLAY_CONFIG);
	}, []);

	// Memoize plugins array
	const plugins = useMemo(() => {
		return autoplayPlugin ? [autoplayPlugin] : [];
	}, [autoplayPlugin]);

	// Memoize carousel items rendering
	const carouselItems = useMemo(() =>
		CAROUSEL_IMAGES.map((item, index) => (
			<CarouselItemMemo key={index} item={item} index={index} />
		)),
		[]);

	return (
		<Carousel
			plugins={plugins}
			className="w-full"
			opts={{
				loop: true,
				align: "start",
				skipSnaps: false,
				dragFree: false,
			}}
		>
			<CarouselContent className="w-full">
				{carouselItems}
			</CarouselContent>
			<CarouselPrevious
				className="text-blue-400 font-extrabold"
				aria-label="পূর্বের ছবি দেখুন"
			/>
			<CarouselNext
				className="text-blue-400 font-extrabold"
				aria-label="পরের ছবি দেখুন"
			/>
		</Carousel>
	);
}

export default memo(HomeCarousel);