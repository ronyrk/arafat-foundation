import GallerySidebar from '@/components/GallerySidebar'
import React from 'react'
import icon from "../../../public/divider.svg"
import Image from 'next/image'

function page() {
	return (
		<section className="bg-[#FCFCFD]">
			<div className="md:mx-20 md:my-4 my-2">
				<h1 className="py-2 text-4xl font-semibold text-center text-color-main">গ্যালারী</h1>
				<div className='flex flex-col items-center justify-center gap-2 py-3 '>
					<Image src={icon} alt='icon' />
				</div>
				<div className="flex md:flex-row flex-col gap-4">
					<div className="basis-1/5">
						<GallerySidebar />
					</div>
					<div className=" md:p-1 bg-white  rounded-md border-[2px] basis-4/5">
						<div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-1">
							<div className=" flex justify-center p-2">
								<Image src="/gallery-14.jpg" className=' rounded-md hover:opacity-90' width={308} height={288} alt='icon' />
							</div>
							<div className=" flex justify-center p-2">
								<Image src="/gallery-14.jpg" className=' rounded-md hover:opacity-90' width={308} height={288} alt='icon' />
							</div>
							<div className=" flex justify-center p-2">
								<Image src="/gallery-14.jpg" className=' rounded-md hover:opacity-90' width={308} height={288} alt='icon' />
							</div>
							<div className=" flex justify-center p-2">
								<Image src="/gallery-14.jpg" className=' rounded-md hover:opacity-90' width={308} height={288} alt='icon' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default page