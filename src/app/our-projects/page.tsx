import Image from 'next/image'
import React from 'react'
import icon from '../../../public/divider.svg'

function page() {
	return (
		<div className='py-2'>
			<h1 className="text-center text-4xl text-color-main font-semibold my-2">আমাদের প্রকল্পসমূহ</h1>
			<h1 className="text-center text-xl  text-color-main font-medium my-2">আমি একা কিছু করতে পারবো।  কিন্তু, আমরা সবাই মিলে অনেক কিছু করতে পারবো।</h1>
			<div className=' flex justify-center flex-col items-center'>
				<h1 className="text-center text-xl  text-color-main font-semibold border-dotted py-4">চলুন সবাই মিলে ভালো কিছু করি</h1>
				<Image src={icon} alt='icon' />
			</div>
		</div>
	)
}

export default page