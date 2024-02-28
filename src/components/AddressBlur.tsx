"use client";
import React from 'react'
import { useUser } from './ContextProvider';

function AddressBlur({ address }: { address: string }) {
	const { user } = useUser();
	return (
		<>
			{
				user?.email ? <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>{address}</h2> : <h2 className=" font-normal text-[15px]  text-color-main"><span className="font-semibold mr-2">ঠিকানা :</span>XXXXXXXXXXXXXXXX</h2>
			}
		</>
	)
}

export default AddressBlur