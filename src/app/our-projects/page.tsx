import Image from 'next/image'
import React from 'react'
import icon from '../../../public/divider.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


function page() {
	return (
		<div className='py-2'>
			<h1 className="text-center text-4xl text-color-main font-semibold py-2">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="text-center text-xl  text-color-main font-medium py-2">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className=' flex justify-center flex-col items-center gap-2'>
				<h1 className="text-center text-xl  text-color-main font-semibold border-dotted py-2">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image src={icon} alt='icon' />
			</div>
			<div className="grid grid-cols-3 gap-3">
				<div className=" flex justify-center flex-col p-3">
					<Image src="/Ramadan-activities.jpg" width={380} height={120} className=' w-[382px] h-[260px] object-fill rounded' alt='card' />
					<div className="w-[382px] border-2 p-2 rounded bg-white">
						<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-2">রমজান প্রজেক্ট ২০২৪</h2>
						<p className=" text-[15px] font-medium">আসসালামু আলাইকুম।আলহামদুলিল্লাহ, আর অল্প কিছুদিন পরেই আমরা আরো একটা পবিত্র রমজান মাস পেতে যাচ্ছি।এই রমজান মাসে আমরা প্রতিদিন ৫০/১০০ জন</p>
						<div className="flex flex-row justify-around py-2">
							<Button className='w-[175px] hover:bg-color-sub' asChild>
								<Link href="/">বিস্তারিত দেখুন</Link>
							</Button>
							<Button variant={"outline"} className='w-[175px] text-color-main border-color-main border-2 hover:text-white' asChild>
								<Link href="/login">দান করুন</Link>
							</Button>

						</div>
					</div>
				</div>
				<div className=" flex justify-center flex-col p-3">
					<Image src="/Ramadan-activities.jpg" width={380} height={120} className=' w-[382px] h-[260px] object-fill rounded' alt='card' />
					<div className="w-[382px] border-2 p-2 rounded bg-white">
						<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-2">রমজান প্রজেক্ট ২০২৪</h2>
						<p className=" text-[15px] font-medium">আসসালামু আলাইকুম।আলহামদুলিল্লাহ, আর অল্প কিছুদিন পরেই আমরা আরো একটা পবিত্র রমজান মাস পেতে যাচ্ছি।এই রমজান মাসে আমরা প্রতিদিন ৫০/১০০ জন</p>
						<div className="flex flex-row justify-around py-2">
							<Button className='w-[175px] hover:bg-color-sub' asChild>
								<Link href="/">বিস্তারিত দেখুন</Link>
							</Button>
							<Button variant={"outline"} className='w-[175px] text-color-main border-color-main border-2 hover:text-white' asChild>
								<Link href="/login">দান করুন</Link>
							</Button>

						</div>
					</div>
				</div>
				<div className=" flex justify-center flex-col p-3">
					<Image src="/Ramadan-activities.jpg" width={380} height={120} className=' w-[382px] h-[260px] object-fill rounded' alt='card' />
					<div className="w-[382px] border-2 p-2 rounded bg-white">
						<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-2">রমজান প্রজেক্ট ২০২৪</h2>
						<p className=" text-[15px] font-medium">আসসালামু আলাইকুম।আলহামদুলিল্লাহ, আর অল্প কিছুদিন পরেই আমরা আরো একটা পবিত্র রমজান মাস পেতে যাচ্ছি।এই রমজান মাসে আমরা প্রতিদিন ৫০/১০০ জন</p>
						<div className="flex flex-row justify-around py-2">
							<Button className='w-[175px] hover:bg-color-sub' asChild>
								<Link href="/">বিস্তারিত দেখুন</Link>
							</Button>
							<Button variant={"outline"} className='w-[175px] text-color-main border-color-main border-2 hover:text-white' asChild>
								<Link href="/login">দান করুন</Link>
							</Button>

						</div>
					</div>
				</div>
				<div className=" flex justify-center flex-col p-3">
					<Image src="/Ramadan-activities.jpg" width={380} height={120} className=' w-[382px] h-[260px] object-fill rounded' alt='card' />
					<div className="w-[382px] border-2 p-2 rounded bg-white">
						<h2 className=" text-lg font-semibold text-color-main hover:text-color-sub py-2">রমজান প্রজেক্ট ২০২৪</h2>
						<p className=" text-[15px] font-medium">আসসালামু আলাইকুম।আলহামদুলিল্লাহ, আর অল্প কিছুদিন পরেই আমরা আরো একটা পবিত্র রমজান মাস পেতে যাচ্ছি।এই রমজান মাসে আমরা প্রতিদিন ৫০/১০০ জন</p>
						<div className="flex flex-row justify-around py-2">
							<Button className='w-[175px] hover:bg-color-sub' asChild>
								<Link href="/">বিস্তারিত দেখুন</Link>
							</Button>
							<Button variant={"outline"} className='w-[175px] text-color-main border-color-main border-2 hover:text-white' asChild>
								<Link href="/login">দান করুন</Link>
							</Button>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page