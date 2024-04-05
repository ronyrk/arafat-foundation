import GallerySidebar from '@/components/GallerySidebar'
import React from 'react'

function page() {
	return (
		<section className="bg-[#FCFCFD]">
			<div className="md:mx-20 md:my-4 my-2">
				<div className="flex md:flex-row flex-col gap-4">
					<div className="basis-1/5">
						<GallerySidebar />
					</div>
					<div className=" md:px-2 bg-white  rounded-md border-[2px] px-1 py-2 basis-4/5">
						<h2>Hello</h2>
					</div>
				</div>
			</div>
		</section>
	)
}

export default page