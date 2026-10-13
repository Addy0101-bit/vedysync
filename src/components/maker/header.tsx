"use client"

import React, { useState } from 'react'
import { Search, Bell, HelpCircle, Moon, Sun, Monitor, CheckCircle2 } from 'lucide-react'
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

export default function MakerHeader() {
    const { theme, setTheme } = useTheme()
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const [showVerifiedNotification, setShowVerifiedNotification] = useState(true)

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
                        {showVerifiedNotification && (
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-blue-600"></span>
                        )}
                        <span className="sr-only">Notifications</span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 sm:w-96 overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>
                                {showVerifiedNotification ? 'You have 1 new message.' : 'You have no new messages.'}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 py-4">
                            {!showVerifiedNotification ? (
                                <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                        <Bell className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        No new notifications
                                    </p>
                                </div>
                            ) : (
                                <div className="m-2 p-4 border border-border rounded-md bg-green-100 dark:bg-black/20 shadow-sm flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Account Verified!</h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                                                Your profile has been approved. You can now start adding your medical formulations and trials.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 mt-2">
                                        <Button size="sm" variant="outline" onClick={() => setShowVerifiedNotification(false)} className='cursor-pointer'>
                                            Not Now
                                        </Button>
                                        <SheetClose render={<Link to="/dashboard/maker/medicines" />}>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none cursor-pointer">
                                                Add Meds
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </div>
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
