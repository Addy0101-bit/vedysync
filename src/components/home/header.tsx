import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { Blobatar } from '@blobatar/react'
import "blobatar/motion.css";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "#/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "#/components/ui/alert-dialog"
import { LogOut, Moon, Sun, Monitor, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '#/components/ui/theme-provider'


export default function Header() {
    const { data: session, isPending } = authClient.useSession()
    const navigate = useNavigate()
    const location = useLocation()
    const { theme, setTheme } = useTheme()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await authClient.signOut()
        setShowLogoutDialog(false)
        setIsLoggingOut(false)
        navigate({ to: '/auth/login' })
    }

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
                    <div className="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full px-2 py-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/10">
                        <Link to="/" className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname === '/' ? 'bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'}`}>Home</Link>
                        <Link to="/about" className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname.startsWith('/about') ? 'bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'}`}>About</Link>
                        <Link to="/contact" className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname.startsWith('/contact') ? 'bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'}`}>Contact</Link>
                    </div>
                </div>

                {/* Pill 3: Actions */}
                <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full p-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.04]">
                        {isPending ? (
                            <div className="flex items-center gap-2 px-2">
                                <div className="h-8 w-24 bg-black/5 dark:bg-white/10 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2">|</span>
                                <div className="h-8 w-8 bg-black/5 dark:bg-white/10 rounded-full animate-pulse"></div>
                            </div>
                        ) : session ? (
                            <>
                                {session.user.role && session.user.role !== 'user' && (
                                    <>
                                        <Link to={`/dashboard/${session.user.role}`} className="text-sm font-medium text-zinc-600 bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out">Dashboard</Link>
                                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2">|</span>
                                    </>
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <div className="h-10 w-10 cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300 ease-out">
                                            <div className="h-full w-full">
                                                <Blobatar name={session.user.name || 'user'} animate="always" />
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 mt-2">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="flex flex-col space-y-1">
                                                <span className="font-medium leading-none">{session.user.name}</span>
                                                <span className="text-xs leading-none text-zinc-500">{session.user.email}</span>
                                            </DropdownMenuLabel>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="cursor-pointer">
                                                {theme === 'system' ? <Monitor className="mr-2 h-4 w-4" /> : theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                                                <span>Theme</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuRadioGroup value={theme} onValueChange={(val) => setTheme(val as "light" | "dark" | "system")}>
                                                        <DropdownMenuRadioItem value="light" className="cursor-pointer">
                                                            <Sun className="mr-2 h-4 w-4" />
                                                            <span>Light</span>
                                                        </DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                                                            <Moon className="mr-2 h-4 w-4" />
                                                            <span>Dark</span>
                                                        </DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="system" className="cursor-pointer">
                                                            <Monitor className="mr-2 h-4 w-4" />
                                                            <span>System Default</span>
                                                        </DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-500 dark:focus:text-red-500">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                                    <AlertDialogContent className='rounded-xl'>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                You will be redirected to the login page.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className='border-t border-border p-2'>
                                            <AlertDialogCancel className='rounded-md'>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-red-600 text-white hover:bg-red-700 rounded-md min-w-[100px]">
                                                {isLoggingOut ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Logging out...
                                                    </>
                                                ) : (
                                                    "Log out"
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
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