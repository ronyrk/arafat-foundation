"use client";
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


export function SingleShare({ username, type }: { username: string, type: string }) {
	return (
		<div className=" flex flex-col gap-3">
			<h2 className=" uppercase flex justify-start text-xl font-bold">SHARE:</h2>
			<div className="flex flex-row gap-4">
				<FacebookShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					quote={'next-share is a social share buttons for your next React apps.'}
				>
					<FacebookIcon size={42} round />
				</FacebookShareButton>
				<TwitterShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					title={'next-share is a social share buttons for your next React apps.'}
				>
					<TwitterIcon size={42} round />
				</TwitterShareButton>
				<LinkedinShareButton url={`https://arafatfoundation.vercel.app/${type}/${username}`}>
					<LinkedinIcon size={42} round />
				</LinkedinShareButton>
				<WhatsappShareButton
					url={`https://arafatfoundation.vercel.app/${type}/${username}`}
					title={'next-share is a social share buttons for your next React apps.'}
					separator=":: "
				>
					<WhatsappIcon size={42} round />
				</WhatsappShareButton>
			</div>
		</div>
	)
}
