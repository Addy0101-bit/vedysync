import { createFileRoute } from '@tanstack/react-router'
import { AdminLoading } from '#/components/admin/loading'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllVerifications, updateVerificationStatus } from '#/components/admin/actions'
import { Blobatar } from '@blobatar/react'
import 'blobatar/motion.css'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '#/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '#/components/ui/alert-dialog'
import { Calendar, CheckCheckIcon, CheckCircle, CheckCircle2, ShieldCheck, User as UserIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/admin/report')({
    component: ReportPage,
})

function ReportPage() {
    const { data: verifications = [], isLoading } = useQuery({
        queryKey: ['allVerifications'],
        queryFn: () => getAllVerifications(),
    })

    const queryClient = useQueryClient()

    const [selectedMaker, setSelectedMaker] = useState<any | null>(null)
    const [confirmAction, setConfirmAction] = useState<{ userId: string, status: 'verified' | 'rejected' } | null>(null)

    const updateStatusMutation = useMutation({
        mutationFn: async ({ userId, status }: { userId: string, status: 'verified' | 'rejected' | 'hold' }) => {
            return await updateVerificationStatus({ data: { userId, status } })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allVerifications'] })
            setSelectedMaker(null)
            setConfirmAction(null)
        }
    })

    const handleUpdateStatus = (userId: string, status: 'verified' | 'rejected' | 'hold') => {
        if (status === 'verified' || status === 'rejected') {
            setConfirmAction({ userId, status })
            return
        }
        updateStatusMutation.mutate({ userId, status })
    }

    const confirmStatusUpdate = () => {
        if (confirmAction) {
            updateStatusMutation.mutate(confirmAction)
        }
    }

    const getStatusBadge = (status: string, size: 'sm' | 'md' = 'sm') => {
        const baseClasses = size === 'sm'
            ? "inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
            : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

        switch (status) {
            case 'verified':
                return <span className={`${baseClasses} text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30`}>Verified</span>;
            case 'rejected':
                return <span className={`${baseClasses} text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30`}>Rejected</span>;
            case 'hold':
                return <span className={`${baseClasses} text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30`}>On Hold</span>;
            default:
                return <span className={`${baseClasses} text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30`}>{status === 'pending' ? 'Pending' : status}</span>;
        }
    }

    if (isLoading) {
        return <AdminLoading />
    }

    return (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Verification Reports</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Review maker verifications and clinical researcher applications.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {verifications.length === 0 ? (
                    <div className="col-span-full p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <ShieldCheck className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No records found</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">There are no verification requests yet.</p>
                    </div>
                ) : (
                    verifications.map((maker: any) => (
                        <div
                            key={maker.id}
                            onClick={() => setSelectedMaker(maker)}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all cursor-pointer group flex flex-col gap-4 relative"
                        >
                            {maker.reviewedBy && maker.user?.verificationStatus !== 'pending' && (
                                <div className="absolute top-3 right-3 z-10 group/reviewer">
                                    <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                        {maker.reviewedBy.image ? (
                                            <img src={maker.reviewedBy.image} alt={maker.reviewedBy.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full scale-[1.1]">
                                                <Blobatar name={maker.reviewedBy.name || 'Admin'} animate="always" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute top-full right-0 mt-3 opacity-0 invisible group-hover/reviewer:opacity-100 group-hover/reviewer:visible transition-all translate-y-2 group-hover/reviewer:translate-y-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-20 cursor-default w-60">
                                        <div className="p-5 flex flex-col items-center text-center">
                                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 tracking-wide">
                                                {maker.user?.verificationStatus === 'verified' ? 'Approved By' : maker.user?.verificationStatus === 'rejected' ? 'Rejected By' : 'Held By'}
                                            </span>
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm mb-3">
                                                {maker.reviewedBy.image ? (
                                                    <img src={maker.reviewedBy.image} alt={maker.reviewedBy.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full scale-[1.1]">
                                                        <Blobatar name={maker.reviewedBy.name || 'Admin'} animate="always" />
                                                    </div>
                                                )}
                                            </div>

                                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm flex items-center justify-center gap-1">
                                                {maker.reviewedBy.name}
                                                {maker.reviewedBy.verificationStatus === 'verified' && (
                                                    <img src='/images/verified.png' alt='Verified' className='w-4 h-4' />
                                                )}
                                            </h4>

                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 mb-3">{maker.reviewedBy.email}</p>

                                            <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                                                {maker.reviewedBy.role || 'User'}
                                            </div>
                                        </div>

                                        <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white dark:bg-zinc-950 border-t border-l border-zinc-200 dark:border-zinc-800 rotate-45 rounded-[2px]"></div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-4">
                                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-sm">
                                    {maker.profilePhotoUrl ? (
                                        <img src={maker.profilePhotoUrl} alt={maker.firstName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full scale-[1.05]">
                                            <Blobatar name={maker.user.name || maker.firstName || 'User'} animate="always" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{maker.firstName} {maker.lastName}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{maker.user?.email}</p>
                                    {getStatusBadge(maker.user?.verificationStatus, 'sm')}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(maker.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="font-medium text-blue-600 dark:text-blue-500 group-hover:underline">Review Details &rarr;</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Dialog open={!!selectedMaker} onOpenChange={(open) => !open && setSelectedMaker(null)}>
                <DialogContent className="sm:max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                    {selectedMaker && (
                        <>
                            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                                <DialogTitle className="text-xl">Review Verification Request</DialogTitle>
                                <DialogDescription className="mt-1">
                                    Submitted by {selectedMaker.firstName} {selectedMaker.lastName} on {new Date(selectedMaker.createdAt).toLocaleString()}
                                </DialogDescription>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="grid lg:grid-cols-12 gap-8">
                                    {/* Left Column: User Info */}
                                    <div className="lg:col-span-5 flex flex-col gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 bg-white shadow-sm">
                                                {selectedMaker.profilePhotoUrl ? (
                                                    <img src={selectedMaker.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full scale-[1.05]">
                                                        <Blobatar name={selectedMaker.user?.name || selectedMaker.firstName} animate="always" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-2">
                                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                                    {selectedMaker.firstName} {selectedMaker.middleName || ''} {selectedMaker.lastName}
                                                </h2>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{selectedMaker.user?.email}</p>
                                                <div className="mt-3">
                                                    {getStatusBadge(selectedMaker.user?.verificationStatus, 'md')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
                                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
                                                <UserIcon className="w-4 h-4 text-zinc-400" />
                                                Applicant Details
                                            </h3>
                                            <div className="grid grid-cols-1 gap-y-4">
                                                <div>
                                                    <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Date of Birth</label>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-0.5">{new Date(selectedMaker.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Specialization</label>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-0.5">{selectedMaker.specialization}</p>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Registration Number</label>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 font-mono">{selectedMaker.registrationNumber}</p>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-zinc-500 uppercase tracking-wider font-medium">ID Proof Type Provided</label>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 capitalize">{selectedMaker.idProofType.replace('-', ' ')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Documents */}
                                    <div className="lg:col-span-7 flex flex-col">
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                                            Verification Documents
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <DocumentCard
                                                title="Degree Certificate"
                                                description="Primary medical degree (e.g. BAMS, MD)"
                                                url={selectedMaker.degreeFileUrl}
                                            />
                                            <DocumentCard
                                                title="Medical Registration"
                                                description="State or Central Council Registration"
                                                url={selectedMaker.registrationFileUrl}
                                            />
                                            <DocumentCard
                                                title="Government ID"
                                                description={`Official ${selectedMaker.idProofType.replace('-', ' ')} document`}
                                                url={selectedMaker.idProofFileUrl}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0 flex justify-end items-center">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedMaker.userId, 'hold')}
                                        disabled={updateStatusMutation.isPending}
                                        className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors shadow-sm disabled:opacity-50">
                                        {updateStatusMutation.isPending && updateStatusMutation.variables.status === 'hold' ? 'Holding...' : 'Hold'}
                                    </button>
                                    {selectedMaker.user?.verificationStatus !== 'verified' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedMaker.userId, 'rejected')}
                                                disabled={updateStatusMutation.isPending}
                                                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 dark:bg-red-950 dark:text-red-100 dark:border-red-900 dark:hover:bg-red-900/80 transition-colors shadow-sm disabled:opacity-50">
                                                {updateStatusMutation.isPending && updateStatusMutation.variables.status === 'rejected' ? 'Rejecting...' : 'Reject'}
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedMaker.userId, 'verified')}
                                                disabled={updateStatusMutation.isPending}
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50">
                                                {updateStatusMutation.isPending && updateStatusMutation.variables.status === 'verified' ? 'Approving...' : 'Approve'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && !updateStatusMutation.isPending && setConfirmAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {confirmAction?.status === 'verified' ? 'Approve Request' : 'Reject Request'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {confirmAction?.status === 'verified'
                                ? "Have you properly read the file documents? By clicking approve, you are confirming that the documents are valid and the user is approved."
                                : "Are you sure you want to reject this request? By clicking reject, you confirm that you have reviewed the documents and found them insufficient."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={updateStatusMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                confirmStatusUpdate();
                            }}
                            disabled={updateStatusMutation.isPending}
                            className={confirmAction?.status === 'rejected' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                        >
                            {updateStatusMutation.isPending ? 'Processing...' : (confirmAction?.status === 'verified' ? 'Approve' : 'Reject')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}

function DocumentCard({ title, description, url }: { title: string, description: string, url: string }) {
    const [imgError, setImgError] = useState(false);

    if (!url) return null;

    // Check if it's likely an image or PDF. UploadThing URLs often lack extensions, so we fallback on imgError.
    const isExplicitPdf = url.toLowerCase().includes('.pdf');
    const showPdfIcon = isExplicitPdf || imgError;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all group bg-white dark:bg-zinc-950">
            <div className="h-40 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                {!showPdfIcon ? (
                    <img
                        src={url}
                        alt={title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-300"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src="/images/pdf.png" alt="PDF Document" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="bg-white/95 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 backdrop-blur-md">View Full Document</span>
                </div>
            </div>
            <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-1">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">{title}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
            </div>
        </a>
    )
}
