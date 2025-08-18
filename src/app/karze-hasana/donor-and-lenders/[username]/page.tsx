import DonorTable from '@/components/DonorTable';
import PhotoBlur from '@/components/PhotoBlur';
import { Share } from '@/components/Share';
import { DonorIProps, DonorPaymentIProps, ParamsIProps } from '@/types'
import { unstable_noStore } from 'next/cache';
import React from 'react'
import { notFound } from 'next/navigation';

// Optimized data fetching with better error handling
async function getUser(username: string): Promise<DonorIProps> {
	unstable_noStore();
	try {
		const res = await fetch(`https://af-admin.vercel.app/api/donor/${username}`, {
			cache: 'no-store'
		});

		if (!res.ok) {
			if (res.status === 404) {
				notFound();
			}
			throw new Error(`Failed to fetch donor data: ${res.status}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
}

// Optimized payment data fetching
async function getPaymentData(username: string): Promise<DonorPaymentIProps[]> {
	unstable_noStore();
	try {
		const res = await fetch(`https://af-admin.vercel.app/api/donor_payment/${username}`, {
			cache: 'no-store'
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch payment data: ${res.status}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching payment data:', error);
		return [];
	}
}

// Utility function to sum amounts from filtered payments
function calculateTotal(payments: DonorPaymentIProps[], type: string, field: keyof DonorPaymentIProps): number {
	return payments
		.filter(item => item.type === type)
		.reduce((total, item) => {
			const value = item[field];
			return total + (typeof value === 'string' ? parseFloat(value) || 0 : 0);
		}, 0);
}

// Optimized calculation functions
function calculateTotals(paymentList: DonorPaymentIProps[]) {
	const totalLending = calculateTotal(paymentList, "LENDING", "amount");
	const totalDonate = calculateTotal(paymentList, "DONATE", "donate");
	const totalRefound = calculateTotal(paymentList, "REFOUND", "loanPayment");

	// Calculate total loan payments from all types
	const totalLoanPayments = paymentList.reduce((total, item) => {
		const payment = item.loanPayment;
		return total + (typeof payment === 'string' ? parseFloat(payment) || 0 : 0);
	}, 0);

	const outstanding = (totalLending - totalLoanPayments) - totalDonate;
	const donorTotalAmount = totalLending + totalDonate;

	return {
		totalLending,
		totalDonate,
		totalRefound,
		outstanding,
		donorTotalAmount
	};
}

// Memoized status getter
function getStatus(status: string): string {
	return status === "LEADER" ? "LENDER" : status;
}

type Props = {
	params: { username: string }
};

export async function generateMetadata({ params }: Props) {
	try {
		const donor = await getUser(params.username);

		return {
			title: donor?.name || 'Donor Profile',
			description: donor?.about || 'Donor profile information',
			openGraph: {
				images: donor?.photoUrl ? [
					{
						url: donor.photoUrl,
						width: 800,
						height: 600,
						alt: donor.name || 'Donor photo',
					},
					{
						url: donor.photoUrl,
						width: 1800,
						height: 1600,
						alt: donor.name || 'Donor photo',
					},
				] : [],
			},
		};
	} catch (error) {
		return {
			title: 'Donor Profile',
			description: 'Donor profile information',
		};
	}
}

async function page({ params }: ParamsIProps) {
	const { username } = params;

	try {
		// Parallel data fetching for better performance
		const [donor, paymentList] = await Promise.all([
			getUser(username),
			getPaymentData(username)
		]);

		if (!donor) {
			notFound();
		}

		// Calculate all totals once
		const totals = calculateTotals(paymentList);
		const userStatus = getStatus(donor.status);

		return (
			<div className='flex flex-col gap-3'>
				<div className="flex md:flex-row flex-col justify-between gap-3 px-2">
					<div className="basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
						<PhotoBlur name={donor.name} url={donor.photoUrl} />
						<span className="absolute top-3 bg-white left-2 border-[2px] text-[13px] lowercase font-normal p-[2px] rounded">
							{userStatus}
						</span>
					</div>

					<div className="basis-9/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
						<h2 className="font-semibold text-xl py-1 text-color-main">{donor.name}</h2>
						<h2 className="font-normal text-[15px] text-color-main">
							<span className="font-semibold mr-2">Lives in:</span>
							{donor.lives}
						</h2>

						{donor.status === "LEADER" ? (
							<>
								<h2 className="font-normal text-[15px] text-color-main">
									<span className="font-semibold mr-2">Total Lending:</span>
									{totals.totalLending.toLocaleString()}
								</h2>
								<h2 className="font-normal text-[15px] text-color-main">
									<span className="font-semibold mr-2">Total Donate:</span>
									{totals.totalDonate.toLocaleString()}
								</h2>
								<h2 className="font-normal text-[15px] text-color-main">
									<span className="font-semibold mr-2">Total Refund:</span>
									{totals.totalRefound.toLocaleString()}
								</h2>
								<h2 className="font-normal text-[15px] text-color-main">
									<span className="font-semibold mr-2">Outstanding:</span>
									{totals.outstanding.toLocaleString()}
								</h2>
							</>
						) : (
							<h2 className="font-normal text-[15px] text-color-main">
								<span className="font-semibold mr-2">Total Donate:</span>
								{totals.donorTotalAmount.toLocaleString()}
							</h2>
						)}
					</div>
				</div>

				{donor.about && (
					<div className="p-4">
						<h2 className="text-[16px] font-normal text-color-main">{donor.about}</h2>
					</div>
				)}

				<div className="py-2 px-4">
					<Share username={donor.username} type='karze-hasana/donor-and-lenders' />
				</div>

				<DonorTable data={donor} />
			</div>
		);
	} catch (error) {
		console.error('Error in donor page:', error);
		notFound();
	}
}

export default page;