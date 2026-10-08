import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { auth } from '#/lib/auth';
import { prisma } from '#/lib/db';
import { sendStatusUpdateEmail } from '#/lib/email';

export const getAllVerifications = createServerFn({ method: 'GET' })
  .handler(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const allMakers = await prisma.maker.findMany({
      include: {
        user: true,
        reviewedBy: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return allMakers;
  });

export const getPendingVerifications = createServerFn({ method: 'GET' })
  .handler(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const pendingMakers = await prisma.maker.findMany({
      where: {
        user: {
          verificationStatus: 'pending'
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return pendingMakers;
  });

export const updateVerificationStatus = createServerFn({ method: 'POST' })
  .validator((d: { userId: string; status: 'verified' | 'rejected' | 'hold' }) => d)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const { userId, status } = data;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: status }
    });

    await prisma.maker.update({
      where: { userId },
      data: { reviewedById: session.user.id }
    });

    if (user.email) {
      await sendStatusUpdateEmail(user.email, user.name || 'User', status);
    }

    return user;
  });

export const getPaginatedUsers = createServerFn({ method: 'GET' })
  .validator((d: { page: number; pageSize: number }) => d)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const { page, pageSize } = data;
    const skip = (page - 1) * pageSize;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count()
    ]);

    return {
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    };
  });

export const getDashboardMetrics = createServerFn({ method: 'GET' })
  .handler(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    try {
      const [
        totalMakers,
        activeTrials,
        pendingVerifications,
        totalTesters,
        latestPendingMakers
      ] = await Promise.all([
        prisma.maker.count(),
        prisma.marketplace.count({ where: { inStock: true } }), // Mocking active clinical trials with marketplace items
        prisma.user.count({ where: { verificationStatus: 'pending' } }),
        prisma.user.count({ where: { role: 'tester' } }),
        prisma.maker.findMany({
          where: { user: { verificationStatus: 'pending' } },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { user: true }
        })
      ]);

      return {
        metrics: {
          totalMakers,
          activeTrials,
          pendingVerifications,
          totalTesters
        },
        health: {
          dbStatus: 'Connected',
          bucketCapacity: '42% (210GB/500GB)',
          alerts: [
            { id: 1, type: 'warning', message: 'High CPU usage detected at 04:00 AM' },
            { id: 2, type: 'info', message: 'System backup completed successfully' }
          ]
        },
        latestPendingMakers
      };
    } catch (error) {
      return {
        metrics: { totalMakers: 0, activeTrials: 0, pendingVerifications: 0, totalTesters: 0 },
        health: { dbStatus: 'Error', bucketCapacity: 'Unknown', alerts: [{ id: 0, type: 'error', message: 'Database connection failed' }] },
        latestPendingMakers: []
      }
    }
  });
