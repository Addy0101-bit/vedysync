import { __toESM } from "../_runtime.mjs";
import { __exportAll } from "./factory-DpNr67AD.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { HeadContent, ScriptOnce, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr.mjs";
import { auth } from "./auth-D2IxJBBm.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DJQE-Z6l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ktc06k4d.css";
function getThemeScript(storageKey, defaultTheme) {
	return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${JSON.stringify(defaultTheme)}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}
var ThemeProviderContext = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => {}
});
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	const resolved = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
	root.classList.add(resolved);
	root.style.colorScheme = resolved;
}
function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
	const [theme, setThemeState] = (0, import_react.useState)(defaultTheme);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(storageKey);
		setThemeState(stored === "light" || stored === "dark" || stored === "system" ? stored : defaultTheme);
		setMounted(true);
	}, [defaultTheme, storageKey]);
	(0, import_react.useEffect)(() => {
		if (!mounted) return;
		applyTheme(theme);
	}, [theme, mounted]);
	(0, import_react.useEffect)(() => {
		if (!mounted || theme !== "system") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme, mounted]);
	const setTheme = (next) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProviderContext, {
		value: {
			theme,
			setTheme
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: getThemeScript(storageKey, defaultTheme) }), children]
	});
}
function useTheme() {
	const context = (0, import_react.useContext)(ThemeProviderContext);
	if (context === void 0) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VedaSync - Secure Trials. Global Standards" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico?v=2"
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("body", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] }) })]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-nF7yJjCq.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./about-Bupb9aBx.mjs");
var Route$11 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./contact-CAZlyr_t.mjs");
var Route$10 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./route-DW0Hgr-E.mjs");
function DashboardPending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 border-border border rounded p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-zinc-600 dark:text-zinc-400 font-medium",
				children: "Loading..."
			})]
		})
	});
}
var Route$9 = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		await new Promise((resolve) => setTimeout(resolve, 600));
	},
	pendingComponent: DashboardPending,
	pendingMs: 0,
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./forgot-password-R20_fzec.mjs");
var Route$8 = createFileRoute("/auth/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var redirectIfAuthenticated = createServerFn({ method: "GET" }).handler(createSsrRpc("125f380cda88571a5c485f309249b9ac3239a48a48f2bc5c3bba53b8c39d9b7f"));
var requireAuthForRoles = createServerFn({ method: "GET" }).handler(createSsrRpc("cf2fd1943bab8397c7dc0d44f21f21ab4ff72d5fd803139cc138d8a0af25438c"));
createServerFn({ method: "GET" }).handler(createSsrRpc("16dd413e21928919add2cdf613bba9b84b0e73157b5036c662df9b8738bb0231"));
var requireAdmin = createServerFn({ method: "GET" }).handler(createSsrRpc("062238d278066e27f0c7e27c12aeedaa6c0aa5a28c064a972d718e5cd04504ce"));
var requireMaker = createServerFn({ method: "GET" }).handler(createSsrRpc("1ab1028a9a60a3942a55a43ecba392fa3f2fcfd2531ec9b8bcd21aa80bf33328"));
var requireInvestor = createServerFn({ method: "GET" }).handler(createSsrRpc("1e8ae7ddd7c9241806afb484a606488ae1e18dc319e2b3843f5d2b7e0bf394d5"));
var requireTester = createServerFn({ method: "GET" }).handler(createSsrRpc("2b4215b2662496bf75671ce62ce47b83c24c8483470eec7856b204681a227c40"));
var $$splitComponentImporter$6 = () => import("./login-2yK38Ht0.mjs");
var Route$7 = createFileRoute("/auth/login")({
	beforeLoad: () => redirectIfAuthenticated(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./roles-DiGSbTRE.mjs");
var Route$6 = createFileRoute("/auth/roles")({
	beforeLoad: () => requireAuthForRoles(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./signup-CwEhQFXD.mjs");
var Route$5 = createFileRoute("/auth/signup")({
	beforeLoad: () => redirectIfAuthenticated(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var Route$4 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: async ({ request }) => {
		return await auth.handler(request);
	},
	POST: async ({ request }) => {
		return await auth.handler(request);
	}
} } });
var $$splitComponentImporter$3 = () => import("./admin-DhPbwDDD.mjs");
var Route$3 = createFileRoute("/dashboard/admin/")({
	beforeLoad: () => requireAdmin(),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./investor-Bm3PHZga.mjs");
var Route$2 = createFileRoute("/dashboard/investor/")({
	beforeLoad: () => requireInvestor(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./maker-BEGXrOD7.mjs");
var Route$1 = createFileRoute("/dashboard/maker/")({
	beforeLoad: () => requireMaker(),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tester-Crp-c-3I.mjs");
var Route = createFileRoute("/dashboard/tester/")({
	beforeLoad: () => requireTester(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$13
});
var ContactRoute = Route$10.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$13
});
var DashboardRouteRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$13
});
var AuthForgotPasswordRoute = Route$8.update({
	id: "/auth/forgot-password",
	path: "/auth/forgot-password",
	getParentRoute: () => Route$13
});
var AuthLoginRoute = Route$7.update({
	id: "/auth/login",
	path: "/auth/login",
	getParentRoute: () => Route$13
});
var AuthRolesRoute = Route$6.update({
	id: "/auth/roles",
	path: "/auth/roles",
	getParentRoute: () => Route$13
});
var AuthSignupRoute = Route$5.update({
	id: "/auth/signup",
	path: "/auth/signup",
	getParentRoute: () => Route$13
});
var ApiAuthSplatRoute = Route$4.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$13
});
var DashboardRouteRouteChildren = {
	DashboardAdminIndexRoute: Route$3.update({
		id: "/admin/",
		path: "/admin/",
		getParentRoute: () => DashboardRouteRoute
	}),
	DashboardInvestorIndexRoute: Route$2.update({
		id: "/investor/",
		path: "/investor/",
		getParentRoute: () => DashboardRouteRoute
	}),
	DashboardMakerIndexRoute: Route$1.update({
		id: "/maker/",
		path: "/maker/",
		getParentRoute: () => DashboardRouteRoute
	}),
	DashboardTesterIndexRoute: Route.update({
		id: "/tester/",
		path: "/tester/",
		getParentRoute: () => DashboardRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	DashboardRouteRoute: DashboardRouteRoute._addFileChildren(DashboardRouteRouteChildren),
	AboutRoute,
	ContactRoute,
	AuthForgotPasswordRoute,
	AuthLoginRoute,
	AuthRolesRoute,
	AuthSignupRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
function getContext() {
	return { queryClient: new QueryClient() };
}
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { router_exports, useTheme };
