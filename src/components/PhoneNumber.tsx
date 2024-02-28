"use client";
import React from 'react'
import { useUser } from './ContextProvider';

function PhoneNumber({ phone }: { phone: string }) {
	const { user } = useUser();
	const hideNumber = phone.slice(0, 7);
	return (
		<>
			{
				user?.email ? <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ফোন:</span>{phone}</h2> : <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ফোন:</span>{`${hideNumber}XXXX`}</h2>
			}
		</>
	)
}

export default PhoneNumber