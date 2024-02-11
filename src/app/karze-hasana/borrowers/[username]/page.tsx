import BorrowersDocuments from '@/components/BorrowersDocuments';
import BorrowersTransaction from '@/components/BorrowersTransaction';
import { LoanIProps, ParamsIProps } from '@/types'
import Image from 'next/image';
import React from 'react'

async function getUser(username: string) {
	const res = await fetch(`https://arafatfoundation.vercel.app/api/loan/${username}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	};
	return res.json();
};

async function page({ params }: ParamsIProps) {
	const { username } = params;
	const data: LoanIProps = await getUser(username);
	return (
		<div className='flex flex-col gap-4'>
			<div className="flex flex-row justify-between gap-2">
				<div className=" basis-3/12 border-[2px] p-2 flex justify-around relative rounded">
					<Image className=' rounded-md object-cover' src={data.photosUrl} alt={data.name} width={260} height={140} />
					<span className=" absolute top-3 bg-white left-2 border-[2px] text-[13px] font-normal p-[2px] rounded">ঋণগ্রহীতা</span>
				</div>
				<div className="basis-5/12 border-[2px] rounded p-1 px-2 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-1  text-color-main">শাজাহান আলী</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>ফকরাবাদ, বড়দল-৯৪৬১, আশাশুনি, সাতক্ষীরা</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">পেশা:</span>অফিস সহকারী</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট ঋণ:</span>1000</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">মোট পরিশোধিত ঋণ:</span>1000</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">বকেয়া ঋণ:</span>1000</h2>
					<h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ফোন:</span>01793874052</h2>
				</div>
				<BorrowersDocuments data={data} />
			</div>
			<div className="p-4">
				<h2 className="text-[16px] font-normal text-color-main">{data.about} </h2>
			</div>
			<BorrowersTransaction />
		</div>
	)
}

export default page