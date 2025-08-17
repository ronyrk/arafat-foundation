"use client";
import React, { useMemo } from 'react'
import { useUser } from './ContextProvider';

interface PhoneNumberProps {
	phone: string;
}

function PhoneNumber({ phone }: PhoneNumberProps) {
	const { user } = useUser();

	// Memoize the phone display logic to avoid recalculating on every render
	const displayPhone = useMemo(() => {
		if (!phone) return '';

		// Clean the phone number (remove any non-digits)
		const cleanPhone = phone.replace(/\D/g, '');

		// If user is logged in, show full number
		if (user?.email) {
			return cleanPhone;
		}

		// If user is not logged in, hide digits based on length
		if (cleanPhone.length >= 4) {
			const hiddenDigits = cleanPhone.length - 4;
			const visiblePart = cleanPhone.slice(-4); // Last 4 digits
			const hiddenPart = 'X'.repeat(hiddenDigits);
			return hiddenPart + visiblePart;
		}

		// If phone number is less than 4 digits, show all X's
		return 'X'.repeat(cleanPhone.length);
	}, [phone, user?.email]);

	// Early return if no phone number
	if (!phone) {
		return null;
	}

	return (
		<h2 className="font-normal text-[15px] text-color-main">
			<span className="font-semibold mr-2">ফোন:</span>
			{displayPhone}
		</h2>
	);
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(PhoneNumber);