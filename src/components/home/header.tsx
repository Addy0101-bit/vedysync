import { Link } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { RiveWrapper } from '#/components/ui/rive-wrapper'

export default function Header() {
    const { data: session, isPending } = authClient.useSession()

    return (
        <header className="fixed top-2 left-0 right-0 z-50 flex justify-center items-center max-w-7xl mx-auto px-6 w-full pointer-events-none">
            <nav className="flex items-center justify-between w-full pointer-events-auto">

                {/* Pill 1: Logo */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex items-center justify-center transition-transform hover:scale-[1.05] active:scale-[0.95]">
                        <img src="/images/vedasync.png" alt="Vedasync Logo" className="h-16 w-16 object-contain" />
                    </Link>
                </div>

                {/* Pill 2: Navigation Links */}
                <div className="flex-none hidden md:block">
                    <div className="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full px-2 py-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.04]">
                        <Link to="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">Home</Link>
                        <Link to="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">About</Link>
                        <Link to="/contact" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">Contact</Link>
                    </div>
                </div>

                {/* Pill 3: Actions */}
                <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full p-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.04]">
                        {isPending ? (
                            <div className="flex items-center gap-2 px-2">
                                <div className="h-8 w-24 bg-black/5 dark:bg-white/10 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2">|</span>
                                <div className="h-10 w-10 bg-black/5 dark:bg-white/10 rounded-full animate-pulse"></div>
                            </div>
                        ) : session ? (
                            <>
                                {session.user.role && session.user.role !== 'user' && (
                                    <>
                                        <Link to={`/dashboard/${session.user.role}`} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">Dashboard</Link>
                                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2">|</span>
                                    </>
                                )}
                                <div className="h-10 w-10 rounded-full overflow-hidden ml-2 mr-1">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <RiveWrapper src="/animations/avatar.riv" stateMachine="State Machine 1" />
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">Login</Link>
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2">|</span>
                                <Link to="/auth/signup" className="text-sm font-medium px-5 py-2 bg-primary text-white rounded-full hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-300 ease-out">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>

            </nav>
        </header>
    )
}