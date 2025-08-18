"use client";
import { Facebook, Linkedin, Phone, Twitter, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
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

interface ShareButtonProps {
	icon: React.ElementType;
	label: string;
	bgColor: string;
	hoverColor: string;
	children: React.ReactNode;
}

const ShareButton = ({ icon: Icon, label, bgColor, hoverColor, children }: ShareButtonProps) => (
	<div className="group relative">
		<div className={`
			relative overflow-hidden rounded-xl border-2 border-gray-200 
			transition-all duration-300 ease-out
			hover:border-transparent hover:shadow-lg hover:scale-105
			bg-white hover:${hoverColor}
		`}>
			{children}
		</div>

		{/* Tooltip */}
		<div className="
			absolute -top-12 left-1/2 transform -translate-x-1/2
			bg-gray-900 text-white text-xs px-3 py-1 rounded-lg
			opacity-0 group-hover:opacity-100 transition-all duration-200
			pointer-events-none whitespace-nowrap z-10
		">
			<span>Share on {label}</span>
			<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
		</div>
	</div>
);

export function Share({ username, type }: { username: string, type: string }) {
	const [copied, setCopied] = useState(false);
	const shareUrl = `https://arafatfoundation.org/${type}/${username}`;
	const shareTitle = 'Arafat Foundation LTD.';

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	return (
		<div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
					<Share2 className="w-5 h-5 text-white" />
				</div>
				<h2 className="text-xl font-bold text-gray-800 tracking-wide">
					Share Profile
				</h2>
			</div>

			{/* Share URL Display */}
			<div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
				<div className="flex items-center justify-between gap-3">
					<div className="flex-1 min-w-0">
						<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
							Share Link
						</p>
						<p className="text-sm text-gray-700 truncate font-mono bg-white px-2 py-1 rounded border">
							{shareUrl}
						</p>
					</div>
					<button
						onClick={copyToClipboard}
						className={`
							flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
							transition-all duration-200 whitespace-nowrap
							${copied
								? 'bg-green-100 text-green-700 border-2 border-green-200'
								: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200'
							}
						`}
					>
						{copied ? (
							<>
								<Check className="w-4 h-4" />
								Copied!
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								Copy
							</>
						)}
					</button>
				</div>
			</div>

			{/* Social Share Buttons */}
			<div className="space-y-4">
				<p className="text-sm font-medium text-gray-600">Share on social media:</p>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ShareButton
						icon={Facebook}
						label="Facebook"
						bgColor="bg-blue-50"
						hoverColor="bg-blue-500"
					>
						<FacebookShareButton
							url={shareUrl}
							quote={shareTitle}
							className="w-full h-full flex items-center justify-center p-4 rounded-xl transition-all duration-300 hover:bg-blue-500 group"
						>
							<Facebook className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
						</FacebookShareButton>
					</ShareButton>

					<ShareButton
						icon={Twitter}
						label="Twitter"
						bgColor="bg-sky-50"
						hoverColor="bg-blue-500"
					>
						<TwitterShareButton
							url={shareUrl}
							title={shareTitle}
							className="w-full h-full flex items-center justify-center p-4 rounded-xl transition-all duration-300 hover:bg-sky-500 group"
						>
							<Twitter className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors duration-300" />
						</TwitterShareButton>
					</ShareButton>

					<ShareButton
						icon={Linkedin}
						label="LinkedIn"
						bgColor="bg-blue-50"
						hoverColor="bg-blue-500"
					>
						<LinkedinShareButton
							url={shareUrl}
							className="w-full h-full flex items-center justify-center p-4 rounded-xl transition-all duration-300 hover:bg-blue-700 group"
						>
							<Linkedin className="w-8 h-8 text-blue-700 group-hover:text-white transition-colors duration-300" />
						</LinkedinShareButton>
					</ShareButton>

					<ShareButton
						icon={Phone}
						label="WhatsApp"
						bgColor="bg-green-50"
						hoverColor="bg-green-500"
					>
						<WhatsappShareButton
							url={shareUrl}
							title={shareTitle}
							separator=":: "
							className="w-full h-full flex items-center justify-center p-4 rounded-xl transition-all duration-300 hover:bg-green-500 group"
						>
							<Phone className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
						</WhatsappShareButton>
					</ShareButton>
				</div>
			</div>

			{/* Statistics/Info Footer */}
			<div className="mt-6 pt-4 border-t border-gray-200">
				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
						<span>Ready to share</span>
					</div>
					<span className="text-xs">Arafat Foundation</span>
				</div>
			</div>
		</div>
	)
}