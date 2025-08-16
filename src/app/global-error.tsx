'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface GlobalErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function GlobalError({
	error,
	reset,
}: GlobalErrorProps) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<html>
			<body>
				<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 font-sans overflow-hidden relative">
					{/* Animated Content */}
					<div className="text-center text-white z-10 max-w-lg px-8 animate-[slideInUp_0.8s_ease-out]">

						{/* Animated Error Icon */}
						<div className="mb-8 animate-[bounceIn_1.2s_ease-out]">
							<div className="w-30 h-30 border-4 border-white/30 rounded-full mx-auto relative animate-spin">
								<div className="absolute top-1/2 left-1/2 w-1 h-10 bg-white rounded-sm transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse"></div>
								<div className="absolute top-1/2 left-1/2 w-1 h-10 bg-white rounded-sm transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-pulse delay-300"></div>
							</div>
						</div>

						{/* Error Text */}
						<div className="mb-8">
							<h1 className="text-4xl md:text-5xl font-bold mb-4 animate-[fadeInDown_1s_ease-out_0.3s_both]">
								Oops! Something went wrong
							</h1>
							<p className="text-lg mb-4 opacity-90 leading-relaxed animate-[fadeInDown_1s_ease-out_0.5s_both]">
								We encountered an unexpected error. Don&#39;t worry, our team has been notified.
							</p>
							<p className="text-sm opacity-70 mb-8 font-mono animate-[fadeInDown_1s_ease-out_0.7s_both]">
								Error Code: {error.digest || 'UNKNOWN'}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 justify-center flex-wrap animate-[fadeInUp_1s_ease-out_0.9s_both]">
							<button
								onClick={() => reset()}
								className="group relative overflow-hidden px-6 py-3 bg-white/20 text-white border-2 border-white rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
							>
								<span className="relative z-10">Try Again</span>
							</button>
							<Link
								href="/"
								className="group relative overflow-hidden px-6 py-3 bg-transparent text-white border-2 border-white/50 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
							>
								<span className="relative z-10">Go Home</span>
							</Link>
						</div>
					</div>

					{/* Floating Particles */}
					<div className="absolute inset-0 pointer-events-none">
						<div className="absolute w-5 h-5 bg-white/10 rounded-full top-1/5 left-1/10 animate-[float_6s_ease-in-out_infinite_-0.5s]"></div>
						<div className="absolute w-4 h-4 bg-white/10 rounded-full top-3/5 right-[15%] animate-[float_6s_ease-in-out_infinite_-2s]"></div>
						<div className="absolute w-6 h-6 bg-white/10 rounded-full bottom-1/5 left-1/5 animate-[float_6s_ease-in-out_infinite_-1.5s]"></div>
						<div className="absolute w-3 h-3 bg-white/10 rounded-full top-[30%] right-1/5 animate-[float_6s_ease-in-out_infinite_-3s]"></div>
						<div className="absolute w-5 h-5 bg-white/10 rounded-full bottom-[30%] right-[40%] animate-[float_6s_ease-in-out_infinite_-4s]"></div>
					</div>
				</div>

				<style jsx>{`
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
			</body>
		</html>
	)
}