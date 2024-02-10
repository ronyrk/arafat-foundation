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
		<div>
			<div className="flex flex-row justify-between gap-2">
				<div className=" basis-2/12 border-[2px] p-2 flex justify-around">
					<Image className=' object-contain rounded' src={data.photosUrl} alt={data.name} width={240} height={120} />
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
				<div className=" basis-5/12 border-[2px] rounded px-3 py-1 flex flex-col justify-around">
					<h2 className=" font-semibold text-xl py-2 text-color-main">Borrowers Documents</h2>
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">Application Form 1</h2>
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">Application Form 2</h2>
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">NID Front</h2>
					<h2 className=" font-semibold text-[15px] py-2 text-color-main">NID Back</h2>

				</div>
			</div>
		</div>
	)
}

export default page