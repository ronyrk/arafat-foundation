'use client'

import { Button } from "@/components/ui/button"
import { BugIcon, RefreshCw } from "lucide-react"

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<html>
			<body>
				<div className="flex flex-col min-h-[100vh] items-center justify-center space-y-4">
					<div className="space-y-2 text-center">
						<BugIcon className="mx-auto h-12 w-12" />
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Uh oh! An unexpected error occurred.</h1>
							<p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Don`&rsquo;`t worry, our team has been notified. You can try refreshing the page or contact support.
							</p>
						</div>
					</div>
					<Button
						className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-color-sub"
						onClick={() => reset()}
					>
						<RefreshCw className="w-4" />	Refresh
					</Button>
				</div>
			</body>
		</html>
	)
}