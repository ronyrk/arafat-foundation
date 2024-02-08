import { SingInForm } from '@/components/SignInForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				{/* <Image className="mx-auto h-10 w-auto" src="https://i.ibb.co/QHXFhC6/20b60157-086a-486e-906e-4b551176d1c2-removebg-preview.png" alt="" width={100} height={100} /> */}
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<SingInForm />
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Sing Up
					</Link>
				</p>
			</div>
		</div>
	)
}

export default page