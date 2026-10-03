import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const getBaseURL = () => {
    if (process.env.BETTER_AUTH_URL) {
        return process.env.BETTER_AUTH_URL;
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NODE_ENV === 'production') {
        return 'https://vedysync.vercel.app';
    }
    return 'http://localhost:3000';
};

export const auth = betterAuth({
    baseURL: getBaseURL(),
    trustedOrigins: [
        'http://localhost:3000',
        'https://vedysync.vercel.app',
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
            },
            hasChosenRole: {
                type: "boolean",
                required: false,
                defaultValue: false,
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [
        tanstackStartCookies()
    ]
});