import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'

export const redirectIfAuthenticated = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  
  if (session) {
    if (session.user.role) {
      throw redirect({ to: '/' })
    } else {
      throw redirect({ to: '/auth/roles' })
    }
  }
})

export const requireAuthForRoles = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  
  if (!session) {
    throw redirect({ to: '/auth/login' })
  }
  if (session.user.role) {
    throw redirect({ to: '/' })
  }
})

export const requireAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  
  if (!session) {
    throw redirect({ to: '/auth/login' })
  }
  if (!session.user.role) {
    throw redirect({ to: '/auth/roles' })
  }
})

export const requireAdmin = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  if (!session) throw redirect({ to: '/auth/login' })
  if (session.user.role !== 'admin') throw redirect({ to: '/' })
})

export const requireMaker = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  if (!session) throw redirect({ to: '/auth/login' })
  if (session.user.role !== 'maker') throw redirect({ to: '/' })
})

export const requireInvestor = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  if (!session) throw redirect({ to: '/auth/login' })
  if (session.user.role !== 'investor') throw redirect({ to: '/' })
})

export const requireTester = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })
  if (!session) throw redirect({ to: '/auth/login' })
  if (session.user.role !== 'tester') throw redirect({ to: '/' })
})
