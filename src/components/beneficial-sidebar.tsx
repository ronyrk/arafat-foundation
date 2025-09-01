"use client";

import Link from 'next/link';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Define types for better type safety
type MatchType = "exact" | "subroute" | "dynamic";

interface Route {
    href: string;
    label: string;
    matchType: MatchType;
    subrouteKey?: string;
    dynamicPattern?: string; // Pattern to match dynamic routes
}

// Move route configuration outside component to prevent recreation
const ROUTES: Route[] = [
    {
        href: "/beneficiary/about-beneficiary",
        label: "About Beneficiaries",
        matchType: "exact",
    },
    {
        href: "/beneficiaries",
        label: "Our Beneficiaries",
        matchType: "dynamic",
        dynamicPattern: "/beneficiaries", // Will match both /beneficiaries and /beneficiary/[name]
    },
    {
        href: "/beneficiary/donors",
        label: "Beneficiary Donors",
        matchType: "dynamic",
        dynamicPattern: "/beneficiary/donor/", // Matches /beneficiary/donor/[name]
    },
];

// Memoized route item component to prevent unnecessary re-renders
const RouteItem = React.memo<{
    href: string;
    label: string;
    isActive: boolean;
    className?: string;
}>(({ href, label, isActive, className }) => (
    <Link
        prefetch={false}
        className={`px-4 py-3 text-[15px] font-semibold rounded-md transition-colors duration-150 ${isActive
            ? "bg-color-main text-white"
            : "text-black hover:bg-[#DDDCF0] hover:text-black"
            } ${className || ""}`}
        href={href}
    >
        {label}
    </Link>
));

RouteItem.displayName = 'RouteItem';

// Helper function to check if a route is active
function isRouteActive(route: Route, pathname: string): boolean {
    if (route.matchType === "exact") {
        return pathname === route.href;
    }
    else if (route.matchType === "subroute" && route.subrouteKey) {
        const pathSegments = pathname.split('/').filter(Boolean);

        if (pathSegments.includes(route.subrouteKey)) {
            return true;
        }

        if (pathname.startsWith(route.href)) {
            return true;
        }

        return false;
    }
    else if (route.matchType === "dynamic" && route.dynamicPattern) {
        // Handle dynamic routes

        // For "Our Beneficiaries" - match both /beneficiaries and /beneficiary/[name]
        if (route.dynamicPattern === "/beneficiaries") {
            // Match exact /beneficiaries page
            if (pathname === "/beneficiaries") {
                return true;
            }
            // Match individual beneficiary pages /beneficiary/[name] but exclude specific routes
            if (pathname.startsWith("/beneficiary/")) {
                const afterBeneficiary = pathname.slice("/beneficiary/".length);
                return afterBeneficiary.length > 0 &&
                    !afterBeneficiary.includes('/') &&
                    !pathname.startsWith('/beneficiary/donor/') &&
                    !pathname.startsWith('/beneficiary/about-beneficiary');
            }
            return false;
        }

        // For /beneficiary/donor/[name] - only match donor pages
        else if (route.dynamicPattern === "/beneficiary/donor/") {
            if (pathname.startsWith(route.dynamicPattern)) {
                const afterPattern = pathname.slice(route.dynamicPattern.length);
                return afterPattern.length > 0 && !afterPattern.includes('/');
            }
            return false;
        }
    }

    return false;
}

function Sidebar() {
    const pathname = usePathname();

    // Memoize active states calculation
    const activeStates = useMemo(() => {
        return ROUTES.map(route => isRouteActive(route, pathname));
    }, [pathname]);

    return (
        <nav
            className="flex flex-col bg-[#F1F1FA] border-2 rounded"
            role="navigation"
            aria-label="Karze Hasana Navigation"
        >
            {ROUTES.map((route, index) => (
                <RouteItem
                    key={route.href} // Using href as key is more stable than index
                    href={route.href}
                    label={route.label}
                    isActive={activeStates[index]}
                />
            ))}
        </nav>
    );
}

export default React.memo(Sidebar);