"use client";

import Link from 'next/link';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Move route configuration outside component to prevent recreation
const ROUTES = [
    {
        href: "/beneficiary/about-beneficiary",
        label: "About Beneficiaries",
        matchType: "exact" as const,
    },
    {
        href: "/beneficiaries",
        label: "Our Beneficiaries",
        matchType: "exact" as const,
    },
    {
        href: "/beneficiary/donors",
        label: "Beneficiary Donors",
        matchType: "subroute" as const,
        subrouteKey: "donors",
    },
] as const;

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

function Sidebar() {
    const pathname = usePathname();

    // Memoize route parsing to avoid recalculation on every render
    const { subRoute, activeStates } = useMemo(() => {
        const routes = pathname.split('/');
        const subRoute = routes[2]; // routes.at(2) is less performant

        const activeStates = ROUTES.map(route => {
            if (route.matchType === "exact") {
                return pathname === route.href;
            } else {
                return subRoute === route.subrouteKey;
            }
        });

        return { subRoute, activeStates };
    }, [pathname]);

    return (
        <nav
            className="flex flex-col bg-[#F1F1FA] border-2 rounded"
            role="navigation"
            aria-label="Karze Hasana Navigation"
        >
            {ROUTES.map((route, index) => (
                <RouteItem
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={activeStates[index]}
                    className={index === 0 ? "pl-4" : undefined} // Special styling for first item
                />
            ))}
        </nav>
    );
}

export default React.memo(Sidebar);