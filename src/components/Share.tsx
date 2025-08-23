"use client";
import { Facebook, Linkedin, PhoneCall, Twitter } from 'lucide-react';
import {
	FacebookShareButton,
	FacebookIcon,
} from 'next-share'
import {
	TwitterShareButton,
	TwitterIcon,
} from 'next-share'
import {
	WhatsappShareButton,
	WhatsappIcon,
} from 'next-share'
import {
	LinkedinShareButton,
	LinkedinIcon,
} from 'next-share'


export function Share({ username, type }: { username: string, type: string }) {
	return (
		<div className=" flex flex-col gap-3">
			<h2 className=" uppercase flex justify-start text-xl font-bold">SHARE:</h2>
			<div className="flex flex-row gap-4">
				<FacebookShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					quote={'Arafat foundation LTD.'}
				>
					<Facebook className=' hover:bg-blue-500 hover:text-white p-1 rounded border-2' size={40} />
				</FacebookShareButton>
				<TwitterShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					title={'Arafat foundation LTD.'}
				>
					<Twitter className=' hover:bg-blue-500 hover:text-white p-1 rounded border-2' size={40} />
				</TwitterShareButton>
				<LinkedinShareButton url={`https://arafatfoundation.vercel.app/${type}/${username}`}>
					<Linkedin className=' hover:bg-blue-500 hover:text-white p-1 rounded border-2' size={40} />
				</LinkedinShareButton>
				<WhatsappShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					title={'Arafat foundation LTD.'}
					separator=":: "
				>
					<PhoneCall className=' hover:bg-blue-500 hover:text-white p-1 rounded border-2' size={40} />
				</WhatsappShareButton>
			</div>
		</div>
	)
}