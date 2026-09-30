import { auth } from "./auth-Df-DNhOj.mjs";
import { redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getRequestHeaders } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.middleware-gfccTDQH.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var redirectIfAuthenticated_createServerFn_handler = createServerRpc({
	id: "125f380cda88571a5c485f309249b9ac3239a48a48f2bc5c3bba53b8c39d9b7f",
	name: "redirectIfAuthenticated",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => redirectIfAuthenticated.__executeServer(opts));
var redirectIfAuthenticated = createServerFn({ method: "GET" }).handler(redirectIfAuthenticated_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (session) {
		if (session.user.hasChosenRole) throw redirect({ to: "/" });
		else throw redirect({ to: "/auth/roles" });
	}
});
var requireAuthForRoles_createServerFn_handler = createServerRpc({
	id: "cf2fd1943bab8397c7dc0d44f21f21ab4ff72d5fd803139cc138d8a0af25438c",
	name: "requireAuthForRoles",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireAuthForRoles.__executeServer(opts));
var requireAuthForRoles = createServerFn({ method: "GET" }).handler(requireAuthForRoles_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (session.user.hasChosenRole) throw redirect({ to: "/" });
});
var requireAuth_createServerFn_handler = createServerRpc({
	id: "16dd413e21928919add2cdf613bba9b84b0e73157b5036c662df9b8738bb0231",
	name: "requireAuth",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireAuth.__executeServer(opts));
var requireAuth = createServerFn({ method: "GET" }).handler(requireAuth_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (!session.user.hasChosenRole) throw redirect({ to: "/auth/roles" });
});
var requireAdmin_createServerFn_handler = createServerRpc({
	id: "062238d278066e27f0c7e27c12aeedaa6c0aa5a28c064a972d718e5cd04504ce",
	name: "requireAdmin",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireAdmin.__executeServer(opts));
var requireAdmin = createServerFn({ method: "GET" }).handler(requireAdmin_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (session.user.role !== "admin") throw redirect({ to: "/" });
});
var requireMaker_createServerFn_handler = createServerRpc({
	id: "1ab1028a9a60a3942a55a43ecba392fa3f2fcfd2531ec9b8bcd21aa80bf33328",
	name: "requireMaker",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireMaker.__executeServer(opts));
var requireMaker = createServerFn({ method: "GET" }).handler(requireMaker_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (session.user.role !== "maker") throw redirect({ to: "/" });
});
var requireInvestor_createServerFn_handler = createServerRpc({
	id: "1e8ae7ddd7c9241806afb484a606488ae1e18dc319e2b3843f5d2b7e0bf394d5",
	name: "requireInvestor",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireInvestor.__executeServer(opts));
var requireInvestor = createServerFn({ method: "GET" }).handler(requireInvestor_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (session.user.role !== "investor") throw redirect({ to: "/" });
});
var requireTester_createServerFn_handler = createServerRpc({
	id: "2b4215b2662496bf75671ce62ce47b83c24c8483470eec7856b204681a227c40",
	name: "requireTester",
	filename: "src/lib/auth.middleware.ts"
}, (opts) => requireTester.__executeServer(opts));
var requireTester = createServerFn({ method: "GET" }).handler(requireTester_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });
	if (!session) throw redirect({ to: "/auth/login" });
	if (session.user.role !== "tester") throw redirect({ to: "/" });
});
//#endregion
export { redirectIfAuthenticated_createServerFn_handler, requireAdmin_createServerFn_handler, requireAuthForRoles_createServerFn_handler, requireAuth_createServerFn_handler, requireInvestor_createServerFn_handler, requireMaker_createServerFn_handler, requireTester_createServerFn_handler };
