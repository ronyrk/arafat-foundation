'use client';

import { useState, useEffect } from 'react';
import { ChevronUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={cn(
                'fixed bottom-8 right-8 z-50 p-2 rounded-full shadow-lg',
                'bg-background border border-border hover:bg-accent',
                'transition-all duration-300 ease-in-out transform',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary',
                'active:scale-95',
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
            )}
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <ChevronUpCircle size={32} className="text-foreground/70 hover:text-foreground transition-colors" />
        </button>
    );
}