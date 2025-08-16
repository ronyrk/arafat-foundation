import React from 'react';

// Skeleton components for better organization
const SkeletonBox = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const SkeletonLine = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded h-4 ${className}`} />
);

const SkeletonCircle = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

// Profile Image Carousel Skeleton
const ProfileImagesSkeleton = () => (
    <div className="basis-4/12 border-2 border-gray-200 rounded-2xl p-6 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonLine className="w-32" />
        </div>

        <div className="relative">
            <SkeletonBox className="aspect-[4/3] w-full mb-4" />

            {/* Carousel controls skeleton */}
            <SkeletonCircle className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10" />
            <SkeletonCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10" />
        </div>

        {/* Profile stats skeleton */}
        <div className="mt-6 grid grid-cols-2 gap-3">
            <SkeletonBox className="h-16" />
            <SkeletonBox className="h-16" />
        </div>
    </div>
);

// Profile Information Skeleton
const ProfileInfoSkeleton = () => (
    <div className="basis-4/12 border-2 border-gray-200 rounded-2xl p-6 bg-white shadow-lg h-full">
        <div className="flex items-center gap-3 mb-6">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonLine className="w-40" />
        </div>

        <div className="space-y-4">
            {/* Name field - highlighted */}
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <div className="flex items-start gap-3">
                    <SkeletonCircle className="w-8 h-8 mt-1" />
                    <div className="flex-1">
                        <SkeletonLine className="w-16 mb-2" />
                        <SkeletonLine className="w-32" />
                    </div>
                </div>
            </div>

            {/* Other profile fields */}
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                        <SkeletonCircle className="w-8 h-8 mt-1" />
                        <div className="flex-1">
                            <SkeletonLine className="w-20 mb-2" />
                            <SkeletonLine className="w-28" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Contact card skeleton */}
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
                <SkeletonCircle className="w-4 h-4" />
                <SkeletonLine className="w-24" />
            </div>
            <SkeletonLine className="w-32" />
        </div>
    </div>
);

// Documents Skeleton
const DocumentsSkeleton = () => (
    <div className="basis-4/12 border-2 border-gray-200 rounded-2xl p-6 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonLine className="w-36" />
        </div>

        <div className="space-y-4">
            {/* NID Front */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SkeletonCircle className="w-2 h-2" />
                        <SkeletonLine className="w-20" />
                    </div>
                    <SkeletonBox className="w-16 h-8 rounded-lg" />
                </div>
            </div>

            {/* NID Back */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SkeletonCircle className="w-2 h-2" />
                        <SkeletonLine className="w-20" />
                    </div>
                    <SkeletonBox className="w-16 h-8 rounded-lg" />
                </div>
            </div>
        </div>

        {/* Status indicator skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
                <SkeletonLine className="w-24" />
                <SkeletonBox className="w-20 h-6 rounded-full" />
            </div>
        </div>
    </div>
);

// Share Component Skeleton
const ShareSkeleton = () => (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonLine className="w-28" />
        </div>

        {/* Share URL Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                    <SkeletonLine className="w-20 mb-2" />
                    <SkeletonBox className="h-8 w-full" />
                </div>
                <SkeletonBox className="w-20 h-10 rounded-lg" />
            </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-4">
            <SkeletonLine className="w-40" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonBox key={index} className="aspect-square rounded-xl" />
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonLine className="w-20" />
                </div>
                <SkeletonLine className="w-24" />
            </div>
        </div>
    </div>
);

// About Section Skeleton
const AboutSkeleton = () => (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonLine className="w-32" />
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-6">
            <div className="space-y-3">
                <SkeletonLine className="w-full" />
                <SkeletonLine className="w-4/5" />
                <SkeletonLine className="w-full" />
                <SkeletonLine className="w-3/4" />
                <SkeletonLine className="w-full" />
                <SkeletonLine className="w-2/3" />
            </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <SkeletonLine className="w-32" />
            <div className="flex items-center gap-2">
                <SkeletonCircle className="w-4 h-4" />
                <SkeletonLine className="w-20" />
            </div>
        </div>
    </div>
);

// Transaction Table Skeleton
const TransactionTableSkeleton = () => (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <SkeletonCircle className="w-10 h-10" />
                <SkeletonLine className="w-40" />
            </div>
        </div>

        <div className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                <SkeletonLine className="w-16" />
                <SkeletonLine className="w-20" />
                <SkeletonLine className="w-24" />
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100">
                    <SkeletonLine className="w-24" />
                    <SkeletonLine className="w-16" />
                    <SkeletonBox className="w-20 h-8 rounded-lg" />
                </div>
            ))}
        </div>
    </div>
);

// Main Loading Component
export default function BeneficialProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Skeleton */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border">
                        <SkeletonCircle className="w-6 h-6" />
                        <SkeletonLine className="w-32" />
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Main Profile Section */}
                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
                            <ProfileImagesSkeleton />
                        </div>
                        <div className="lg:col-span-4">
                            <ProfileInfoSkeleton />
                        </div>
                        <div className="lg:col-span-4">
                            <DocumentsSkeleton />
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="px-4">
                        <ShareSkeleton />
                    </div>

                    {/* About Section */}
                    <AboutSkeleton />

                    {/* Transaction Table */}
                    <TransactionTableSkeleton />
                </div>
            </div>
        </div>
    );
}