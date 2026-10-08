import React from 'react'
import { Search, Bell, HelpCircle, Moon, Sun, Monitor } from 'lucide-react'
import { Blobatar } from '@blobatar/react'
import 'blobatar/motion.css'
import { Input } from '#/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '#/components/ui/dropdown-menu'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from '#/components/ui/sheet'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { useTheme } from '#/components/ui/theme-provider'
import { Button } from '#/components/ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getPendingVerifications } from './actions'

export default function AdminHeader() {
    const { theme, setTheme } = useTheme()
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)

    const { data: pendingVerifications = [] } = useQuery({
        queryKey: ['pendingVerifications'],
        queryFn: () => getPendingVerifications(),
    })

    return (
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="flex-1 flex items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathSegments.map((segment: string, index: number) => {
                            const path = `/${pathSegments.slice(0, index + 1).join('/')}`
                            const isLast = index === pathSegments.length - 1
                            const label = segment.charAt(0).toUpperCase() + segment.slice(1)

                            return (
                                <React.Fragment key={path}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink render={<Link to={path} />}>
                                                {label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 bg-zinc-100/50 dark:bg-zinc-900/50 border-border focus-visible:ring-1"
                    />
                </div>

                <Sheet>
                    <SheetTrigger render={<Button variant="ghost" size="icon" className="relative text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />}>
                        <Bell className="h-5 w-5" />
                        {pendingVerifications.length > 0 && (
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-blue-600"></span>
                        )}
                        <span className="sr-only">Notifications</span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 sm:w-96 overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>
                                You have {pendingVerifications.length} unread {pendingVerifications.length === 1 ? 'message' : 'messages'}.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 py-4">
                            {pendingVerifications.length === 0 ? (
                                <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                        <Bell className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        No new notifications
                                    </p>
                                </div>
                            ) : (
                                pendingVerifications.map((maker) => (
                                    <SheetClose key={maker.id} render={<Link to="/dashboard/admin/report" className="block w-full text-left" />}>
                                        <div className="p-4 border border-zinc-200 dark:border-zinc-800/60 rounded-xl bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-200 flex items-start gap-4 cursor-pointer group">
                                            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-800/50 transition-colors">
                                                {maker.profilePhotoUrl ? (
                                                    <img src={maker.profilePhotoUrl} alt={maker.firstName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full scale-[1.05]">
                                                        <Blobatar name={maker.user.name || maker.firstName || 'User'} animate="always" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1 gap-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">Verification Request</span>
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full shrink-0">Pending</span>
                                                </div>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-200">{maker.firstName} {maker.lastName}</span> submitted documents as Clinical Researchers.
                                                </p>
                                                <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                                    {new Date(maker.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </SheetClose>
                                ))
                            )}
                        </div>
                    </SheetContent>
                </Sheet>

                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />}>
                        {theme === 'system' ? <Monitor className="h-5 w-5" /> : theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <span className="sr-only">Toggle theme</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                    <HelpCircle className="h-5 w-5" />
                    <span className="sr-only">Help & Feedback</span>
                </Button>
            </div>
        </header>
    )
}