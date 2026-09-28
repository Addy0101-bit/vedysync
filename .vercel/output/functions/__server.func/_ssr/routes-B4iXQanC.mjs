import { require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Header } from "./header-CojpcgH7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B4iXQanC.js
var import_jsx_runtime = require_jsx_runtime();
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12 overflow-hidden text-center relative antialiased mt-15",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-4 md:inset-2 lg:inset-4 z-0 pointer-events-none border-2 border-border rounded-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/heroBackground.svg",
				alt: "",
				className: "w-full h-full object-cover rounded-[2rem] dark:hidden block"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/heroBackgroundWhite.svg",
				alt: "",
				className: "w-full h-full object-cover rounded-[2rem] hidden dark:block"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-4xl flex flex-col items-center gap-4 z-10 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-lilita drop-shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-blue-600",
						children: "Veda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white dark:text-zinc-900 ml-2",
						children: "Sync"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl md:text-2xl font-semibold text-zinc-100 dark:text-zinc-900 mt-2 max-w-xl",
					children: "AIIA & NPvCC Compliant - Secure Clinical Trials. Global Ayurveda Standards."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg text-zinc-300 dark:text-zinc-800 max-w-2xl leading-relaxed",
					children: "The digital infrastructure replacing fragmented spreadsheets with centralized compliance, supervised testing, and global export readiness."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 cursor-pointer",
						children: "Register as Maker"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "w-full sm:w-auto px-8 py-3.5 border-2 border-zinc-500 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-semibold rounded-full transition-all duration-300 cursor-pointer dark:bg-white/50 backdrop-blur-sm",
						children: "Join Clinical Testing"
					})]
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {})]
	});
}
//#endregion
export { Home as component };
