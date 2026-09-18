import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RiveWrapper } from '#/components/ui/rive-wrapper'
import { useState } from 'react'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { toast } from '#/components/ui/toast'

import { redirectIfAuthenticated } from '#/lib/auth.middleware'

export const Route = createFileRoute('/auth/signup')({
  beforeLoad: () => redirectIfAuthenticated(),
  component: Signup,
})

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !name) return;
    setLoading(true)
    setError('')
    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name,
      })
      if (signUpError) {
        setError(signUpError.message || 'An error occurred')
      } else {
        if (data.user.role) {
          navigate({ to: '/' })
        } else {
          navigate({ to: '/auth/roles' })
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/auth/roles',
        fetchOptions: {
          onSuccess: () => {
            toast.add({
              type: 'success',
              description: 'Logged in successfully',
            })
          }
        }
      })
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    }
  }



  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">

      {/* 70% Left Side - Animation */}
      <div className="hidden lg:flex lg:w-[70%] relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <RiveWrapper src="/animations/auth.riv" stateMachine="State Machine 1" />
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
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-2">Create an account</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Enter your details to get started with Vedasync</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Addy..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <Button onClick={handleGoogleSignIn} variant="outline" type="button" className="w-full">
              <img src="/images/google.png" alt="Google Logo" className="h-4 w-4 mr-2" />
              Google
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}
