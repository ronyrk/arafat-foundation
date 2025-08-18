// loading.tsx
import React from 'react';

// Individual gallery item skeleton
export function GalleryItemSkeleton() {
    return (
        <div className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-2">
            <div className="w-full h-full bg-gray-200 rounded-md animate-pulse relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                {/* Image placeholder icon */}
                <div className="flex items-center justify-center w-full h-full">
                    <svg
                        className="w-8 h-8 md:w-12 md:h-12 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

// Video item skeleton (for iframe placeholders)
export function VideoItemSkeleton() {
    return (
        <div className="md:flex hidden justify-center md:w-[280px] md:h-[200px] p-2">
            <div className="w-full h-full bg-gray-200 rounded-md animate-pulse relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                {/* Play button icon */}
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-gray-500 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Grid skeleton for multiple gallery items
export function GalleryGridSkeleton({ count = 9 }: { count?: number }) {
    return (
        <div className="grid py-2 md:px-1 px-1 grid-cols-3 content-stretch gap-2">
            {Array.from({ length: count }).map((_, index) => (
                <GalleryItemSkeleton key={index} />
            ))}
        </div>
    );
}

// Sidebar skeleton
export function SidebarSkeleton() {
    return (
        <div className="space-y-3 p-4 bg-white rounded-md border-[2px]">
            <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className={`h-4 bg-gray-200 rounded animate-pulse ${index === 0 ? 'w-3/4' :
                                index === 1 ? 'w-1/2' :
                                    index === 2 ? 'w-2/3' :
                                        index === 3 ? 'w-5/6' : 'w-3/5'
                                }`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Page level skeleton (combines all components)
export function GalleryPageSkeleton() {
    return (
        <section className="bg-[#FCFCFD] mt-40">
            <div className="my-2 md:mx-20 mx-2 md:my-4">
                {/* Title skeleton */}
                <div className="flex justify-center py-2">
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Divider skeleton */}
                <div className="flex flex-col items-center justify-center gap-2 py-3">
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Main content skeleton */}
                <div className="flex flex-col gap-1 md:flex-row">
                    <div className="basis-1/5">
                        <SidebarSkeleton />
                    </div>
                    <div className="md:p-1 bg-white rounded-md border-[2px] basis-4/5">
                        <GalleryGridSkeleton count={12} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Card skeleton for individual items
export function GalleryCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
            <div className="aspect-video bg-gray-200 rounded-md mb-3 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
}

// Loading spinner component
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
        </div>
    );
}

// Text skeleton for various text elements
export function TextSkeleton({
    lines = 1,
    className = ""
}: {
    lines?: number;
    className?: string;
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className={`h-4 bg-gray-200 rounded animate-pulse ${index === lines - 1 ? 'w-3/4' : 'w-full'
                        }`}
                ></div>
            ))}
        </div>
    );
}

// Button skeleton
export function ButtonSkeleton({
    variant = "primary",
    size = "md"
}: {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
}) {
    const sizeClasses = {
        sm: "h-8 w-16",
        md: "h-10 w-20",
        lg: "h-12 w-24"
    };

    return (
        <div className={`${sizeClasses[size]} bg-gray-200 rounded animate-pulse`}></div>
    );
}

// Default export for the main page loading
export default function Loading() {
    return <GalleryPageSkeleton />;
}