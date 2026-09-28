import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
    // We remove baseURL entirely so it defaults to the current domain (works for both local and production!)
})