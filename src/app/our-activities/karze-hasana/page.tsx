import Link from 'next/link'
import React from 'react'

function page() {
	return (
		<div className='px-2'>
			<h2 className=" font-medium text-2xl">কর্জে হাসানা/সুদ বিহীন ঋণ</h2>
			<p className=" leading-relaxed py-3">
				আর্থিক ইবাদতের মধ্যে একটি গুরুত্বপূর্ণ ও ফজিলতপূর্ণ ইবাদত হলো- ‘কর্জে হাসানা’ তথা উত্তম ঋণ। পবিত্র কোরআনের ৬টি আয়াতে মোট ১২টি স্থানে কর্জে হাসানার কথা উল্লেখিত হয়েছে। প্রত্যেক স্থানেই করজকে হাসানার সঙ্গে র্বণনা করা হয়েছে। এর দ্বারা বুঝা যায়, করজে হাসানা একটি ইবাদত এবং কল্যাণময় আমল।
			</p>
			<p className=" leading-relaxed font-semibold">কর্জে হাসানা/সুদ বিহীন ঋণ সম্পূর্ণ আলাদা একটি কার্যক্রম।  আমাদের কর্জে হাসানা/সুদ বিহীন ঋণ  সম্পর্কে বিস্তারিত জানতেএখানে <Link className=' text-blue-400' href="/karze-hasana"> ক্লিক</Link> করুন।</p>
		</div>
	)
}

export default page