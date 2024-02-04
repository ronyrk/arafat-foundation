import Image from 'next/image'
import React from 'react'
import banner from '../../public/banner.png';

function BackgroundFooter() {
	return (
		<div className=' relative md:h-[400px] h-[300px]'>
			<Image
				alt='background images'
				src={banner}
				quality={100}
				fill
				sizes='100vw'
				placeholder='blur'
				className=' object-cover -z-50 '
			/>
		</div>
	)
}

export default BackgroundFooter