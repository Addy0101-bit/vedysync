import { Link } from '@tanstack/react-router'
import { LayoutGrid, FileText, Users, } from 'lucide-react'
import { authClient } from '#/lib/auth-client'
import { Blobatar } from '@blobatar/react'
import 'blobatar/motion.css'

interface NavItem {
    label: string
    to: string
    icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
    {
        label: 'Overview',
        to: '/dashboard/admin',
        icon: LayoutGrid,
    },
    {
        label: 'Reports',
        to: '/dashboard/admin/report',
        icon: FileText,
    },
    {
        label: 'Users',
        to: '/dashboard/admin/user',
        icon: Users,
    },
]

export default function AdminSidebar() {
    const { data: session, isPending } = authClient.useSession()

    const userName = session?.user.name || 'Admin'
    const userEmail = session?.user.email || ''
    const userImage = session?.user.image

    return (
        <aside
            aria-label="Admin Sidebar"
            className="fixed top-0 left-0 bottom-0 z-40 w-64 h-screen flex flex-col justify-between bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-colors select-none"
        >
            {/* Top Brand & Navigation */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Brand / Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
                    <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        <img
                            src="/images/vedasync.png"
                            alt="VedaSync Logo"
                            className="h-8 w-auto object-contain drop-shadow"
                        />
                        <span className="font-lilita text-xl tracking-wide">
                            <span className="text-blue-600 dark:text-blue-500 mr-0.5">Veda</span>
                            <span className="text-zinc-900 dark:text-white">Sync</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="px-3 py-5 space-y-1">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    activeProps={{
                                        className:
                                            'bg-black/10 dark:bg-white/10 text-black dark:text-white font-semibold',
                                    }}
                                    activeOptions={{ exact: true }}
                                    inactiveProps={{
                                        className:
                                            'text-black/80 dark:text-white/80 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 font-medium',
                                    }}
                                    className="group flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-150 ease-in-out cursor-pointer"
                                >
                                    <Icon className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:scale-110" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom Profile Section */}
            <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
                {isPending ? (
                    <div className="flex items-center gap-3 p-2 rounded-md">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                            <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-2.5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150">
                        {/* Avatar / Blobatar */}
                        <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shadow-xs">
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full scale-[1.05]">
                                    <Blobatar
                                        name={userName || userEmail || 'Admin'}
                                        animate="always"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Name and Email */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <span
                                title={userName}
                                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate"
                            >
                                {userName}
                            </span>
                            <span
                                title={userEmail}
                                className="text-xs text-zinc-500 dark:text-zinc-400 truncate"
                            >
                                {userEmail}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}