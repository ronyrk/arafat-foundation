import Link from 'next/link'
import React from 'react'

function AdminSidebar() {
	return (
		<div className=' h-[280px]'>
			<div className="flex flex-col  pb-2">
				<div className="px-8 py-3 rounded hover:bg-color-main hover:text-white">
					<Link href="/">Payment Request</Link>
				</div>
				<div className="px-8 py-3 rounded hover:bg-color-main hover:text-white">
					<Link href="/">Payment Request</Link>
				</div>
				<div className="px-8 py-3 rounded hover:bg-color-main hover:text-white">
					<Link href="/">Payment Request</Link>
				</div>
				<div className="px-8 py-3 rounded hover:bg-color-main hover:text-white">
					<Link href="/">Payment Request</Link>
				</div>
			</div>
		</div>
	)
}

export default AdminSidebar