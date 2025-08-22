import React, { Suspense, memo } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { unstable_noStore } from 'next/cache';
import { FaqIProps } from '@/types';
import { cookies } from 'next/headers';
import {
    HelpCircle,
    MessageCircle,
    Search,
    ChevronDown,
    Clock,
    CheckCircle,
    AlertCircle,
    Lightbulb
} from 'lucide-react';

// Skeleton components for loading states
const SkeletonLine = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg h-4 ${className}`}
        style={{ animation: 'shimmer 1.5s ease-in-out infinite' }} />
);

const SkeletonBox = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-xl ${className}`}
        style={{ animation: 'shimmer 1.5s ease-in-out infinite' }} />
);

// Loading skeleton for FAQ items
const FAQSkeleton = () => (
    <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <HelpCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <SkeletonLine className="flex-1 max-w-md" />
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        ))}
    </div>
);

// Optimized HTML converter with memoization
const HTMLContent = memo(({ content }: { content: string }) => {
    const htmlContent = React.useMemo(() => {
        const jsonAndHtml = content.split("^");
        return jsonAndHtml[0];
    }, [content]);

    return (
        <div className="prose prose-gray max-w-none">
            <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
});

HTMLContent.displayName = 'HTMLContent';

// FAQ Item Component with enhanced styling
const FAQItem = memo(({ item, index }: { item: FaqIProps; index: number }) => {
    const getIcon = (index: number) => {
        const icons = [HelpCircle, MessageCircle, Lightbulb, CheckCircle, AlertCircle];
        const IconComponent = icons[index % icons.length];
        return IconComponent;
    };

    const getIconColor = (index: number) => {
        const colors = [
            'text-blue-600 bg-blue-100',
            'text-green-600 bg-green-100',
            'text-yellow-600 bg-yellow-100',
            'text-purple-600 bg-purple-100',
            'text-red-600 bg-red-100'
        ];
        return colors[index % colors.length];
    };

    const Icon = getIcon(index);
    const iconColor = getIconColor(index);

    return (
        <AccordionItem
            value={index.toString()}
            className="border-0 mb-4"
        >
            <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <AccordionTrigger className="px-2 py-1 hover:no-underline [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-blue-50 [&[data-state=open]]:to-indigo-50 transition-all duration-300">
                    <div className="flex items-center gap-1 text-left">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="px-1 pb-2 pt-0">
                    <div className="border-l-2 border-gray-100">
                        <div className="bg-gray-50 rounded-xl p-2 mt-1">
                            <HTMLContent content={item.description} />
                        </div>
                    </div>
                </AccordionContent>
            </div>
        </AccordionItem>
    );
});

FAQItem.displayName = 'FAQItem';

// Optimized Question component with error handling
async function Question() {
    unstable_noStore();

    try {
        const res = await fetch('https://af-admin.vercel.app/api/beneficial/faq', {
            next: { revalidate: 6 }, // Cache for 1 hour
            headers: {
                'Cache-Control': 'max-age=6, s-maxage=3600, stale-while-revalidate=86400',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch FAQ data: ${res.status} ${res.statusText}`);
        }

        const data: FaqIProps[] = await res.json();

        if (!data || data.length === 0) {
            return (
                <div className="text-center py-5">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs Available</h3>
                    <p className="text-gray-500">Check back later for frequently asked questions.</p>
                </div>
            );
        }

        return (
            <Accordion type="single" collapsible className="space-y-0">
                {data.map((item, index) => (
                    <FAQItem key={item.id || index} item={item} index={index} />
                ))}
            </Accordion>
        );
    } catch (error) {
        console.error('FAQ fetch error:', error);
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load FAQs</h3>
                <p className="text-gray-600 mb-4">There was an error loading the frequently asked questions.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Try Again
                </button>
            </div>
        );
    }
}

// Main page component with enhanced design
function FAQPage() {
    cookies();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-2 py-2">
                {/* FAQ Content */}
                <div className="w-full mx-auto">
                    <Suspense fallback={<FAQSkeleton />}>
                        <Question />
                    </Suspense>
                </div>

                {/* Footer */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h3>
                        <p className="text-gray-600 mb-4">
                            Our support team is here to help you with any additional questions.
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;