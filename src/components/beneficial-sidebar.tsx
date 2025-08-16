"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import {
    Info,
    Users,
    Heart,
    HelpCircle,
    ChevronRight,
    Building2,
    Award
} from 'lucide-react'

interface NavigationItem {
    href: string;
    label: string;
    icon: React.ElementType;
    description: string;
    activeCondition: (pathname: string, subRoutes?: string) => boolean;
}

function BeneficialSidebar() {
    const pathname = usePathname();
    const routes = pathname.split('/');
    const subRoutes = routes.at(2);

    const navigationItems: NavigationItem[] = [
        {
            href: "/beneficial/faq",
            label: "About Us",
            icon: Info,
            description: "Learn about our mission",
            activeCondition: (pathname) => pathname === "/beneficial/faq"
        },
        {
            href: "/beneficial",
            label: "Our Beneficial",
            icon: Users,
            description: "View all beneficiaries",
            activeCondition: (pathname, subRoutes) => pathname === "/beneficial" || !subRoutes
        },
        {
            href: "/beneficial/donor",
            label: "Donors",
            icon: Heart,
            description: "Meet our generous donors",
            activeCondition: (pathname, subRoutes) => subRoutes === "donor"
        }
    ];

    const NavigationLink = ({ item }: { item: NavigationItem }) => {
        const isActive = item.activeCondition(pathname, subRoutes);
        const Icon = item.icon;

        return (
            <Link href={item.href} className="group relative block">
                <div className={`
                    relative overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out
                    ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-300 text-white shadow-lg transform scale-[1.02]'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md hover:bg-blue-50'
                    }
                `}>

                    {/* Active indicator */}
                    {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                    )}

                    <div className="flex items-center gap-4 p-4">
                        {/* Icon container */}
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                            ${isActive
                                ? 'bg-white/20 backdrop-blur-sm'
                                : 'bg-blue-100 group-hover:bg-blue-200'
                            }
                        `}>
                            <Icon className={`w-6 h-6 transition-all duration-300 ${isActive
                                ? 'text-white'
                                : 'text-blue-600'
                                }`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className={`
                                font-semibold text-base transition-colors duration-300
                                ${isActive ? 'text-white' : 'text-gray-800 group-hover:text-blue-600'}
                            `}>
                                {item.label}
                            </h3>
                            <p className={`
                                text-sm transition-colors duration-300 mt-1
                                ${isActive
                                    ? 'text-white/80'
                                    : 'text-gray-500 group-hover:text-blue-500'
                                }
                            `}>
                                {item.description}
                            </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                            ${isActive
                                ? 'bg-white/20 text-white'
                                : 'text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-100'
                            }
                        `}>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'transform translate-x-0.5' : 'group-hover:transform group-hover:translate-x-0.5'
                                }`} />
                        </div>
                    </div>

                    {/* Hover effect overlay */}
                    {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    )}
                </div>
            </Link>
        );
    };

    return (
        <div className="space-y-4">

            {/* Navigation Links */}
            <div className="space-y-3">
                {navigationItems.map((item, index) => (
                    <NavigationLink key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default BeneficialSidebar