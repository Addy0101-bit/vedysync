import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { cn } from "../_libs/cn.mjs";
import { Button$1, authClient } from "./button-CRsjw6IY.mjs";
import { ChevronDown, LoaderCircle } from "../_libs/lucide-react.mjs";
import { Label, RiveWrapper } from "./label-DnCkpH7u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles--1PeYDkh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NativeSelect({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group/native-select relative w-fit has-[select:disabled]:opacity-50", className),
		"data-slot": "native-select-wrapper",
		"data-size": size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			"data-slot": "native-select",
			"data-size": size,
			className: "h-9 w-full min-w-0 appearance-none rounded-4xl border border-input bg-input/30 py-1 pr-8 pl-3 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[size=sm]:h-8 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground select-none",
			"aria-hidden": "true",
			"data-slot": "native-select-icon"
		})]
	});
}
function NativeSelectOption({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
		"data-slot": "native-select-option",
		className: cn("bg-[Canvas] text-[CanvasText]", className),
		...props
	});
}
function Roles() {
	const navigate = useNavigate();
	const [role, setRole] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!role) {
			setError("Please select a role");
			return;
		}
		setLoading(true);
		setError("");
		try {
			const { error: updateError } = await authClient.updateUser({
				role,
				hasChosenRole: true
			});
			if (updateError) setError(updateError.message || "Failed to update role");
			else navigate({ to: "/" });
		} catch (err) {
			setError(err.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex bg-zinc-50 dark:bg-zinc-950",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex lg:w-[70%] relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiveWrapper, {
					src: "/animations/role.riv",
					stateMachine: "State Machine 1"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-8 left-8 z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 transition-transform hover:scale-105 active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/vedasync.png",
						alt: "Vedasync Logo",
						className: "h-10 object-contain drop-shadow-lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-lilita text-2xl tracking-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-600 dark:text-blue-500",
							children: "Veda"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-zinc-900 dark:text-white",
							children: "Sync"
						})]
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full lg:w-[30%] flex items-center justify-center p-12 bg-white dark:bg-zinc-950 shadow-2xl relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => window.history.back(),
				className: "absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "h-4 w-4",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					strokeWidth: 2.5,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						d: "M10 19l-7-7m0 0l7-7m-7 7h18"
					})
				}), "Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold text-zinc-900 dark:text-white mb-2",
						children: "Choose your role"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-zinc-500 dark:text-zinc-400",
						children: "Select how you'll be using Vedasync."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-6",
					onSubmit: handleSubmit,
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-red-500 text-sm font-medium",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role",
								className: "ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300",
								children: "Your Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								id: "role",
								name: "role",
								value: role,
								onChange: (e) => setRole(e.target.value),
								disabled: loading,
								className: "w-full h-11 text-base",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "",
										disabled: true,
										children: "Select a role..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "user",
										children: "User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "maker",
										children: "Maker"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "investor",
										children: "Investor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "admin",
										children: "Admin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: "tester",
										children: "Tester"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "submit",
							className: "w-full mt-6",
							disabled: loading,
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] }) : "Continue"
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { Roles as component };
