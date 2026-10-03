import React from 'react'
import { Search, Bell, HelpCircle, Moon, Sun, Monitor } from 'lucide-react'
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

export default function AdminHeader() {
    const { theme, setTheme } = useTheme()
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)

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
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span className="sr-only">Notifications</span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 sm:w-96">
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>
                                You have 0 unread messages.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="p-4 text-center text-sm text-zinc-500">
                                No new notifications
                            </div>
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