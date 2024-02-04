import React from 'react'
import BackgroundFooter from './BackgroundFooter'
import Image from 'next/image'
import logo from '../../public/arafat-logo.png'
import Link from 'next/link'
import { ChevronRight, HeartHandshake, Mail, MapPin, PhoneCall } from 'lucide-react'
import { Button } from "@/components/ui/button";

function Footer() {
	return (
		<div className="md:px-20 px-4">
			<div className="flex md:flex-row flex-col  md:justify-between justify-center">
				<div className="flex basis-1/4 flex-col items-center my-2 bg-green-400 p-4 py-2">
					<Image
						alt='logo'
						src={logo}
						placeholder='blur'
						width={150}
						height={110}
						className=' p-1'
					/>
					<h2 className=" text-black text-[14px] py-2 px-2">আরাফাত ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক, উম্মাহর ঐক্য , শিক্ষা , দাওয়াহ ও মানব কল্যাণে নিবে দিত সেবা মূলমূক প্রতিষ্ঠান।</h2>
					<Button asChild className=' w-28 flex items-center bg-color-main hover:transition hover:delay-150 hover:duration-300 hover:bg-color-sub' size={"lg"}><Link href="https://arafatfoundation.org/donate/">দান করুন <span className='ml-[6px]'><HeartHandshake /></span></Link></Button>
				</div>
				<div className="flex basis-1/4 flex-col  px-4">
					<h2 className="text-[24px] font-semibold border-b-4 border-black">তালিকা</h2>
					<div className="flex flex-col py-4">
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>হোম </Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							আমাদের সম্পর্কে</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							আমাদের কার্যক্রম</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							গ্যালারি </Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							ব্লগ</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							যোগাযোগ </Link>
					</div>
				</div>
				<div className="flex basis-1/4 flex-col px-4">
					<h2 className="text-[24px] font-semibold border-b-4 border-black">আমাদের কার্যক্রম</h2>
					<div className="flex flex-col py-4">
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
							ইসলাম প্রচার </Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

							শীতবস্ত্র বিতরণ</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

							বন্যার্তদের মধ্যে ত্রাণ বিতরণ</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

							সাদাকাহ জারিয়াহ </Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

							যাকাতের অর্থে স্বাবলম্বীকরণ প্রকল্প</Link>
						<Link href="/" className=' text-[15px] font-semibold flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

							ইফতার ও রমাদান ফুড বিতরণ </Link>
					</div>
				</div>
				<div className="flex basis-1/4 flex-col px-4">
					<h2 className="text-[24px] font-semibold border-b-4 border-black">যোগাযোগের তথ্য</h2>
					<div className="flex flex-col gap-0">
						<Link href='/'>
							<div className="flex flex-row items-center">
								<div className="flex flex-row items-center my-1">
									<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
										<PhoneCall className='' size={25} />
									</div>
									<div className="flex flex-col my-2  ml-[3px]">
										<span className='text-[14px] font-medium'>Phone</span>
										<span className=' text-[15px] font-semibold'>01602505070</span>
									</div>
								</div>
							</div>
						</Link>
						<Link href='/'>
							<div className="flex flex-row items-center">
								<div className="flex flex-row items-center my-1">
									<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
										<Mail className='' size={25} />
									</div>
									<div className="flex flex-col my-2  ml-[3px]">
										<span className='text-[14px] font-medium'>Email</span>
										<span className=' text-[15px] font-semibold'>contact@arafatfoundation.org</span>
									</div>
								</div>
							</div>
						</Link>
						<Link href='/'>
							<div className="flex flex-row items-center">
								<div className="flex flex-row items-center my-1">
									<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
										<MapPin className='' size={25} />
									</div>
									<div className="flex flex-col ml-2">
										<span className='text-[13px] font-medium'>Location</span>
										<span className=' text-[14px] font-semibold'>Yousufpur, Charghat, Rajshahi-6271, Bangladesh</span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer