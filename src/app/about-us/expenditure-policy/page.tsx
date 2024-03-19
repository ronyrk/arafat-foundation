import React from 'react'

function page() {
	return (
		<div className="px-2">
			<h2 className=' text-2xl  font-medium'>ব্যয়ের নীতিমালা</h2>
			<ul className='  mx-6 list-disc my-2'>
				<li>দাতাগণ যে খাতের জন্য দান করে থাকেন, সে খাতেই ব্যায় করা হয়। </li>
				<li>কোনো দাতা নিদৃষ্ট কোনো প্রজেক্ট সম্পন্ন করার জন্য ১০০% অর্থ দান করে থাকলে নিদৃষ্ট প্রজেক্ট সম্পন্ন করে দাতাকে ব্যয়ের বিস্তারিত হিসাব দেওয়া।</li>
				<li>বিভিন্ন প্রজেক্ট পরিচালনা বাবদ সংশ্লিষ্ট প্রজেক্ট থেকে  অ্যডমিনিস্ট্রেটিভ খরচ।</li>
			</ul>
		</div>
	)
}

export default page