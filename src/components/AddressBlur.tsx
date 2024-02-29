"use client";
import React from 'react'
import { useUser } from './ContextProvider';

function AddressBlur({ address }: { address: string }) {
	const { user } = useUser();
	const part = address.split(",");

	let text = ""
	for (let i = 1; i < part.length; i++) {
		text += part[i] + ",";
	}
	return (
		<>
			{
				user?.email ? <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>{address}</h2> : <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>XXXXX,{text}</h2>
			}
		</>
	)
}

export default AddressBlur