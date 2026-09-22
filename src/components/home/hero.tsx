export default function Hero() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12 overflow-hidden text-center relative antialiased mt-15">
            <div className="absolute inset-4 md:inset-2 lg:inset-4 z-0 pointer-events-none border-2 border-border rounded-4xl">
                {/* Show dark background in light mode (dark:hidden) */}
                <img src="/images/heroBackground.svg" alt="" className="w-full h-full object-cover rounded-[2rem] dark:hidden block" />
                {/* Show white background in dark mode (hidden dark:block) */}
                <img src="/images/heroBackgroundWhite.svg" alt="" className="w-full h-full object-cover rounded-[2rem] hidden dark:block" />
            </div>
            {/* Content */}
            <div className="w-full max-w-4xl flex flex-col items-center gap-4 z-10 relative">
                <h1
                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-lilita drop-shadow-sm"
                >
                    <span className="text-blue-600">Veda</span>
                    <span className="text-white dark:text-zinc-900 ml-2">Sync</span>
                </h1>

                <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 dark:text-zinc-900 mt-2 max-w-xl">
                    AIIA & NPvCC Compliant - Secure Clinical Trials. Global Ayurveda Standards.
                </h2>

                <p className="text-lg text-zinc-300 dark:text-zinc-800 max-w-2xl leading-relaxed">
                    The digital infrastructure replacing fragmented spreadsheets with centralized compliance, supervised testing, and global export readiness.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 cursor-pointer">
                        Register as Maker
                    </button>

                    <button className="w-full sm:w-auto px-8 py-3.5 border-2 border-zinc-500 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-semibold rounded-full transition-all duration-300 cursor-pointer dark:bg-white/50 backdrop-blur-sm">
                        Join Clinical Testing
                    </button>
                </div>
            </div>

        </div>
    );
}