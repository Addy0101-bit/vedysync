import { Loader2 } from 'lucide-react'

export function AdminLoading() {
    return (
        <div className="flex-1 flex items-center justify-center w-full min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                <p className="text-sm text-zinc-500 font-medium">Loading...</p>
            </div>
        </div>
    )
}
