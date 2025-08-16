"use client";
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="min-h-screen mt-36 flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 font-sans overflow-hidden relative">

			{/* Main Content */}
			<div className="text-center text-white z-10 max-w-2xl px-8">

				{/* Animated 404 */}
				<div className="text-8xl md:text-9xl font-black mb-8 flex justify-center gap-2">
					<span className="animate-[glitch_2s_ease-in-out_infinite_-0.5s] drop-shadow-[0_0_20px_#00f5ff]">4</span>
					<span className="animate-[pulse404_2s_ease-in-out_infinite_-1s] drop-shadow-[0_0_20px_#00f5ff]">0</span>
					<span className="animate-[glitch_2s_ease-in-out_infinite_-1.5s] drop-shadow-[0_0_20px_#00f5ff]">4</span>
				</div>

				{/* Astronaut Container */}
				<div className="relative h-48 mb-12">
					{/* Astronaut */}
					<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[float_4s_ease-in-out_infinite]">
						<div className="relative w-20 h-20">
							{/* Helmet */}
							<div className="absolute -top-2 left-4 w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full border-2 border-gray-400 shadow-[inset_0_0_20px_rgba(0,245,255,0.3)]">
								<div className="absolute top-4 left-4 w-4 h-4 bg-gray-800 rounded-full animate-[blink_3s_ease-in-out_infinite]"></div>
							</div>

							{/* Body */}
							<div className="absolute top-8 left-2 w-16 h-18 bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl"></div>

							{/* Arms */}
							<div className="absolute top-9">
								<div className="absolute -left-3 w-4 h-10 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg transform -rotate-12 animate-[wave_2s_ease-in-out_infinite]"></div>
								<div className="absolute -right-3 w-4 h-10 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg transform rotate-12 animate-[wave_2s_ease-in-out_infinite_1s]"></div>
							</div>

							{/* Legs */}
							<div className="absolute top-20">
								<div className="absolute left-5 w-3 h-9 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg"></div>
								<div className="absolute left-12 w-3 h-9 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg"></div>
							</div>
						</div>
					</div>

					{/* Stars */}
					<div className="absolute inset-0">
						<div className="absolute top-1/5 left-1/5 w-4 h-4 bg-white animate-[twinkle_3s_ease-in-out_infinite_-0.5s]"
							style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
						</div>
						<div className="absolute top-1/3 right-[15%] w-3 h-3 bg-white animate-[twinkle_3s_ease-in-out_infinite_-1s]"
							style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
						</div>
						<div className="absolute bottom-1/3 left-1/10 w-3 h-3 bg-white animate-[twinkle_3s_ease-in-out_infinite_-1.5s]"
							style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
						</div>
						<div className="absolute top-1/2 right-1/5 w-2 h-2 bg-white animate-[twinkle_3s_ease-in-out_infinite_-2s]"
							style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
						</div>
						<div className="absolute bottom-2/5 right-[30%] w-5 h-5 bg-white animate-[twinkle_3s_ease-in-out_infinite_-2.5s]"
							style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
						</div>
					</div>
				</div>

				{/* Text Content */}
				<div className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-[slideInLeft_1s_ease-out]">
						Lost in Space
					</h1>
					<p className="text-lg md:text-xl opacity-80 leading-relaxed animate-[slideInRight_1s_ease-out]">
						The page you&apos;re looking for has drifted away into the cosmic void.
					</p>
				</div>

				{/* Action Button */}
				<div className="animate-[slideInUp_1s_ease-out_0.5s_both]">
					<Link
						href="/"
						className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-400/40 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-600 hover:before:left-full"
					>
						<span className="text-2xl animate-[rocket_2s_ease-in-out_infinite]">🚀</span>
						<span className="relative z-10">Return to Earth</span>
					</Link>
				</div>
			</div>

			<style jsx>{`
        @keyframes glitch {
          0%, 100% { transform: translateX(0); filter: hue-rotate(0deg); }
          20% { transform: translateX(-2px); filter: hue-rotate(90deg); }
          40% { transform: translateX(-2px); filter: hue-rotate(180deg); }
          60% { transform: translateX(2px); filter: hue-rotate(270deg); }
          80% { transform: translateX(2px); filter: hue-rotate(360deg); }
        }
        @keyframes pulse404 {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(-24deg); }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rocket {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
		</div>
	)
}
