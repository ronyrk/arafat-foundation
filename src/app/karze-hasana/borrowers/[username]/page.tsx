import AddressBlur from '@/components/AddressBlur';
import BorrowersDocuments from '@/components/BorrowersDocuments';
import BorrowersTransaction from '@/components/BorrowersTransaction';
import PhoneNumber from '@/components/PhoneNumber';
import PhotoBlur from '@/components/PhotoBlur';
import { Share } from '@/components/Share';
import { LoanIProps, ParamsIProps, PaymentIProps } from '@/types';
import React from 'react';
import { notFound } from 'next/navigation';

type Props = {
	params: { username: string };
};


// Move API calls to separate functions for better error handling and reusability
async function fetchBorrowerData(username: string): Promise<LoanIProps> {
	const response = await fetch(`https://af-admin.vercel.app/api/loan/${username}`, {
		cache: 'no-store' // Equivalent to unstable_noStore but more explicit
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch borrower data: ${response.status}`);
	}

	return response.json();
}

async function fetchPaymentList(username: string): Promise<PaymentIProps[]> {
	const response = await fetch(`https://af-admin.vercel.app/api/loan_list/${username}`, {
		next: {
			revalidate: 0,
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch payment list: ${response.status}`);
	}

	return response.json();
}

// Optimized calculation functions with better performance
function calculateTotalBalance(paymentList: PaymentIProps[], initialBalance: string): string {
	const totalLoanAmount = paymentList.reduce((sum, payment) => {
		return sum + Number(payment.loanAmount);
	}, Number(initialBalance));

	return totalLoanAmount.toString();
}

function calculateTotalPayments(paymentList: PaymentIProps[]): string {
	const totalPaid = paymentList.reduce((sum, payment) => {
		return sum + Number(payment.amount);
	}, 0);

	return totalPaid.toString();
}

function calculateDuePayment(paymentList: PaymentIProps[], initialBalance: string): string {
	const totalBalance = Number(calculateTotalBalance(paymentList, initialBalance));
	const totalPaid = Number(calculateTotalPayments(paymentList));
	const dueAmount = totalBalance - totalPaid;

	return dueAmount.toString();
}

export async function generateMetadata({ params }: Props) {
	try {
		const user = await fetchBorrowerData(params.username);

		return {
			title: user.name,
			description: user.about,
			openGraph: {
				images: [
					{
						url: user.photosUrl,
						width: 800,
						height: 600,
						alt: user.name,
					},
					{
						url: user.photosUrl,
						width: 1800,
						height: 1600,
						alt: user.name,
					},
				],
			},
		};
	} catch (error) {
		// Fallback metadata in case of error
		return {
			title: 'Borrower Profile',
			description: 'Borrower information and loan details',
		};
	}
}

async function BorrowerPage({ params }: ParamsIProps) {
	const { username } = params;

	// Remove unstable_noStore as we're handling cache in fetch calls

	try {
		// Fetch data concurrently for better performance
		const [data, paymentList] = await Promise.all([
			fetchBorrowerData(username),
			fetchPaymentList(username)
		]);

		if (!data) {
			notFound();
		}

		// Calculate all values once instead of in async functions
		const totalBalance = calculateTotalBalance(paymentList, data.balance);
		const totalPayments = calculateTotalPayments(paymentList);
		const dueAmount = calculateDuePayment(paymentList, data.balance);

		return (
			<div className="flex flex-col gap-3">
				<div className="flex md:flex-row flex-col justify-between gap-3 px-2">
					<div className="basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
						<PhotoBlur url={data.photosUrl} name={data.name} />
						<span className="absolute top-3 bg-white left-2 border-[2px] text-[13px] font-normal p-[2px] rounded">
							ঋণগ্রহীতা
						</span>
					</div>

					<div className="basis-5/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
						<h2 className="font-semibold text-xl py-1 text-color-main">
							{data.name}
						</h2>
						<AddressBlur address={data.address} />
						<h2 className="font-normal text-[15px] text-color-main">
							<span className="font-semibold mr-2">পেশা:</span>
							{data.occupation}
						</h2>
						<h2 className="font-normal text-[15px] text-color-main">
							<span className="font-semibold mr-2">মোট ঋণ:</span>
							{totalBalance}
						</h2>
						<h2 className="font-normal text-[15px] text-color-main">
							<span className="font-semibold mr-2">মোট পরিশোধিত ঋণ:</span>
							{totalPayments}
						</h2>
						<h2 className="font-normal text-[15px] text-color-main">
							<span className="font-semibold mr-2">বকেয়া ঋণ:</span>
							{dueAmount}
						</h2>
						<PhoneNumber phone={data.phone} />
					</div>

					<BorrowersDocuments
						nidback={data.nidback}
						nidfont={data.nidfont}
						form1={data.form1}
						form2={data.form2}
					/>
				</div>

				<div className="py-2 px-4">
					<Share username={data.username} type="karze-hasana/borrowers" />
				</div>

				<div className="p-4">
					<h2 className="text-[16px] font-normal text-color-main">
						{data.about}
					</h2>
				</div>

				<BorrowersTransaction
					username={username}
					data={data}
					paymentList={paymentList}
				/>
			</div>
		);
	} catch (error) {
		console.error('Error fetching borrower data:', error);
		notFound();
	}
}

export default BorrowerPage;