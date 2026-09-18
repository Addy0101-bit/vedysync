import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RiveWrapper } from '#/components/ui/rive-wrapper'
import { useState } from 'react'
import { Label } from '#/components/ui/label'
import { Button } from '#/components/ui/button'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { authClient } from '#/lib/auth-client'

import { requireAuthForRoles } from '#/lib/auth.middleware'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/auth/roles')({
  beforeLoad: () => requireAuthForRoles(),
  component: Roles,
})

function Roles() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) {
      setError('Please select a role')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { error: updateError } = await authClient.updateUser({
        role: role,
        hasChosenRole: true,
      })
      if (updateError) {
        setError(updateError.message || 'Failed to update role')
      } else {
        navigate({ to: '/' })
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">

      {/* 70% Left Side - Animation */}
      <div className="hidden lg:flex lg:w-[70%] relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <RiveWrapper src="/animations/role.riv" stateMachine="State Machine 1" />
        </div>

        {/* Logo in top-left corner */}
        <div className="absolute top-8 left-8 z-20">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <img src="/images/vedasync.png" alt="Vedasync Logo" className="h-10 object-contain drop-shadow-lg" />
            <span className="font-lilita text-2xl tracking-wide">
              <span className="text-blue-600 dark:text-blue-500">Veda</span>
              <span className="text-zinc-900 dark:text-white">Sync</span>
            </span>
          </Link>
        </div>
      </div>

      {/* 30% Right Side - Form */}
      <div className="w-full lg:w-[30%] flex items-center justify-center p-12 bg-white dark:bg-zinc-950 shadow-2xl relative z-10">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="w-full max-w-md">

          <div className="flex flex-col items-start mb-10">
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-2">Choose your role</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Select how you'll be using Vedasync.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
            <div className="space-y-3 flex flex-col">
              <Label htmlFor="role" className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Role</Label>
              <NativeSelect
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className="w-full h-11 text-base"
              >
                <NativeSelectOption value="" disabled>Select a role...</NativeSelectOption>
                <NativeSelectOption value="user">User</NativeSelectOption>
                <NativeSelectOption value="maker">Maker</NativeSelectOption>
                <NativeSelectOption value="investor">Investor</NativeSelectOption>
                <NativeSelectOption value="admin">Admin</NativeSelectOption>
                <NativeSelectOption value="tester">Tester</NativeSelectOption>
              </NativeSelect>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>

        </div>
      </div>

    </div>
  )
}
