import React from 'react'
import Image from 'next/image'
import logo from '../../public/Arafat-foundation-footer-logo.png'
import Link from 'next/link'
import { ChevronRight, HandHeart, Mail, MapPin, PhoneCall } from 'lucide-react'
import { Button } from "@/components/ui/button";
import banner from '../../public/banner.png';


function Footer() {
	return (
		<div className="">
			<div className=' md:h-[440px] relative '>
				<Image
					alt='background images'
					src={banner}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					fill
					placeholder='blur'
					priority
					className='-z-20 md:brightness-50'
				/>
				<div className=" absolute top-4 left-0 z-10 md:bg-inherit bg-color-main">
					<div className="md:px-20 p-4 ">
						<div className="grid md:grid-cols-4 grid-cols-1 gap-2">
							<div className="md:flex basis-1/4 flex-col my-2 px-4 py-2 gap-x-10">
								<Image
									alt='logo'
									src={logo}
									placeholder='blur'
									width={150}
									height={110}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
								<h2 className=" text-sm font-medium text-[#F5F5F5] py-4">আরাফাত ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক, উম্মাহর ঐক্য , শিক্ষা , দাওয়াহ ও মানব কল্যাণে নিবে দিত সেবা মূলমূক প্রতিষ্ঠান।</h2>
								<Button asChild className=' w-28 flex items-center bg-color-main hover:transition hover:delay-150 hover:duration-300 hover:bg-color-sub' size={"lg"} variant={"outline"}><Link href="/our-projects">দান করুন <span className='ml-[6px]'><HandHeart /></span></Link></Button>
							</div>
							<div className="flex basis-1/4 flex-col  px-4">
								<h2 className="text-[24px] font-semibold border-b-4   text-[#F5F5F5] border-[#F5F5F5]">তালিকা</h2>
								<div className="flex flex-col py-4">
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>হোম </Link>
									<Link href="/about-us" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										আমাদের সম্পর্কে</Link>
									<Link href="/our-activities" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										আমাদের কার্যক্রম</Link>

									<Link href="/details-of-income-and-expenses" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										আয়ের ও ব্যায়ের হিসাব</Link>
									<Link href="/our-all-links" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										সকল লিংক  </Link>
									<Link href="/blog" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										ব্লগ</Link>
									<Link href="/contact-us" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										যোগাযোগ </Link>

								</div>
							</div>
							<div className="flex basis-1/4 flex-col px-4">
								<h2 className="text-[24px] font-medium text-[#F5F5F5] border-b-4 border-white">আমাদের কার্যক্রম</h2>
								<div className="flex flex-col py-4">
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>
										ইসলাম প্রচার </Link>
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

										শীতবস্ত্র বিতরণ</Link>
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

										বন্যার্তদের মধ্যে ত্রাণ বিতরণ</Link>
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

										সাদাকাহ জারিয়াহ </Link>
									<Link href="/" className='  text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

										যাকাতের অর্থে স্বাবলম্বীকরণ প্রকল্প</Link>
									<Link href="/" className=' text-sm font-medium text-[#F5F5F5] flex flex-row hover:text-color-sub py-1' > <span className=''><ChevronRight /></span>

										ইফতার ও রমাদান ফুড বিতরণ </Link>
								</div>
							</div>
							<div className="flex basis-1/4 flex-col px-4">
								<h2 className="text-[24px] font-semibold  text-white border-b-4 border-white">যোগাযোগের তথ্য</h2>
								<div className="flex flex-col gap-0">
									<a href="tel:01602505070">
										<div className="flex flex-row items-center">
											<div className="flex flex-row items-center my-1">
												<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
													<PhoneCall size={17} />
												</div>
												<div className="flex flex-col my-2  ml-[3px]">
													<span className='text-[14px]  text-white font-medium'>Phone</span>
													<a className=' text-[15px] text-white font-semibold' href="tel:01674997311">01674997311 (Whatsapp)</a>
												</div>
											</div>
										</div>
									</a>
									<a href="mailto:contact@arafatfoundation">
										<div className="flex flex-row items-center">
											<div className="flex flex-row items-center my-1">
												<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
													<Mail size={17} />
												</div>
												<div className="flex flex-col my-2  ml-[3px]">
													<span className='text-[14px] font-medium  text-white'>Email</span>
													<a className=' text-[15px] font-semibold  text-white' href="mailto:contact@arafatfoundation.org">contact@arafatfoundation.org</a>
												</div>
											</div>
										</div>
									</a>
									<div className="flex flex-row items-center cursor-pointer">
										<div className="flex flex-row items-center my-1">
											<div className="bg-gray-300 transition duration-150 ease-in-out hover:bg-color-sub hover:text-white p-3 rounded-md mr-1">
												<MapPin size={17} />
											</div>
											<div className="flex flex-col ml-2">
												<span className='text-[13px] font-medium  text-white'>Location</span>
												<span className=' text-[14px] font-semibold  text-white'>Yousufpur, Charghat, Rajshahi-6271, Bangladesh</span>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div className='md:p-2'>
							<hr className=" border-b-[1px] border-gray-400 w-full my-3" />
							<div className="flex  md:flex-row flex-col items-center justify-between gap-2">
								<h2 className=" text-sm font-medium text-[#F5F5F5]">স্বত্ব &#169; {new Date().getFullYear()}  আরাফাত ফাউন্ডেশন - সর্বস্বত্ব সংরক্ষিত।</h2>
								<h2 className=" text-sm font-medium text-[#F5F5F5]">পরিষেবার শর্তাবলী
									গোপনীয়তা নীতি</h2>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Footer
