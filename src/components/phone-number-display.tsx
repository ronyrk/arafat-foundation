"use client"

import { useState } from "react";
import { Button } from "./ui/button";

// Phone display component with toggle functionality
export const PhoneDisplay = ({ phone }: { phone: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    const maskPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return 'XXXXX';

        // If phone number is less than 4 characters, mask all
        if (phoneNumber.length <= 4) {
            return 'X'.repeat(phoneNumber.length);
        }

        // Show first 2 and last 2 digits, mask the middle
        const firstPart = phoneNumber.slice(0, 2);
        const lastPart = phoneNumber.slice(-2);
        const middleMask = 'X'.repeat(phoneNumber.length - 4);

        return `${firstPart}${middleMask}${lastPart}`;
    };

    const togglePhoneVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="flex items-center gap-2">
            <h2 className="font-normal text-[15px] text-color-main">
                <span className="font-semibold mr-2">ফোন:</span>
                {isVisible ? phone : maskPhoneNumber(phone)}
            </h2>
            <Button
                onClick={togglePhoneVisibility}

                size="sm"
                className="h-6 px-2 text-xs   text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {isVisible ? '👁️ Hide' : '👁️ Show'}
            </Button>
        </div>
    );
};
