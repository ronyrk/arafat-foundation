import { ParamsIProps } from '@/types'
import React from 'react'

function page({ params }: ParamsIProps) {
	const { username } = params;
	return (
		<div>{username}</div>
	)
}

export default page