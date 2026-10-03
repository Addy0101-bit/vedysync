import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Button$1, authClient } from "./button-BfAiZm8K.mjs";
import { LoaderCircle } from "../_libs/lucide-react.mjs";
import { Label, RiveWrapper } from "./label-DnCkpH7u.mjs";
import { Input$1, toast } from "./toast-B7QjZZN-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BxMuNxcl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleGoogleSignIn = async () => {
		setGoogleLoading(true);
		setError("");
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/auth/roles",
				fetchOptions: { onSuccess: () => {
					toast.add({
						type: "success",
						description: "Logged in successfully"
					});
				} }
			});
		} catch (error) {
			setError(error.message || "An error occurred");
			setGoogleLoading(false);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) return;
		setLoading(true);
		setError("");
		try {
			const { data, error: signInError } = await authClient.signIn.email({
				email,
				password
			});
			if (signInError) setError(signInError.message || "Invalid email or password");
			else if (data.user.hasChosenRole) navigate({ to: "/" });
			else navigate({ to: "/auth/roles" });
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
					src: "/animations/auth.riv",
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-start mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold text-zinc-900 dark:text-white mb-2",
							children: "Welcome back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-500 dark:text-zinc-400",
							children: "Enter your details to sign in to your account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-5",
						onSubmit: handleSubmit,
						children: [
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-red-500 text-sm font-medium",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "email",
									type: "email",
									placeholder: "you@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									disabled: loading
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth/forgot-password",
										className: "text-sm font-medium text-primary hover:underline",
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "password",
									type: "password",
									placeholder: "Enter your password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									disabled: loading
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								className: "w-full mt-4",
								disabled: loading,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Signing in..."] }) : "Sign In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative my-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-zinc-200 dark:border-zinc-800" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex justify-center text-xs uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-white dark:bg-zinc-950 px-2 text-zinc-500",
										children: "Or continue with"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								onClick: handleGoogleSignIn,
								variant: "outline",
								type: "button",
								className: "w-full",
								disabled: googleLoading,
								children: googleLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Connecting..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/google.png",
									alt: "Google Logo",
									className: "h-4 w-4 mr-2"
								}), "Google"] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/signup",
								className: "font-medium text-primary hover:underline",
								children: "Sign up"
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Login as component };
