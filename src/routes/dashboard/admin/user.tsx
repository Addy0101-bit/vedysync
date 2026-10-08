import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AdminLoading } from '#/components/admin/loading'
import { getPaginatedUsers } from '#/components/admin/actions'
import { z } from 'zod'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '#/components/ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '#/components/ui/pagination'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'

const searchSchema = z.object({
    page: z.number().catch(1).optional(),
})

export const Route = createFileRoute('/dashboard/admin/user')({
    validateSearch: searchSchema,
    loaderDeps: ({ search: { page } }) => ({ page }),
    loader: async ({ deps: { page } }) => {
        const result = await getPaginatedUsers({ data: { page: page || 1, pageSize: 10 } })
        return result
    },
    pendingComponent: AdminLoading,
    pendingMs: 0,
    component: RouteComponent,
})

function RouteComponent() {
    const { users, totalPages, totalCount } = Route.useLoaderData()
    const { page = 1 } = Route.useSearch()
    const navigate = useNavigate({ from: Route.id })

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            navigate({ search: { page: newPage } })
        }
    }

    return (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Users</h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage {totalCount} users in the application.</p>
            </div>

            <div className="rounded-md border bg-white dark:bg-zinc-950/50">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name || 'Unknown'}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span className="capitalize">{user.role || 'User'}</span>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                            user.verificationStatus === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                                user.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
                                        }`}>
                                        {user.verificationStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    isActive={pageNum === page}
                                    onClick={() => handlePageChange(pageNum)}
                                    className="cursor-pointer"
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </main>
    );
}
