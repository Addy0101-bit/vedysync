import { __toESM } from "../_runtime.mjs";
import { AlertDialogRoot, DialogBackdrop, DialogClose, DialogDescription, DialogPopup, DialogPortal, DialogTitle, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuRadioItemIndicator, MenuRoot, MenuSubmenuRoot, MenuSubmenuTrigger, MenuTrigger, Separator, require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useLocation, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { useTheme } from "./router-I233s1zP.mjs";
import { cn } from "../_libs/cn.mjs";
import { Button$1, authClient } from "./button-CRsjw6IY.mjs";
import { r } from "../_libs/blobatar+blobatar__react.mjs";
import { ChevronRight, Circle, LoaderCircle, LogOut, Monitor, Moon, Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/header-DJ_TmmpL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, {
		"data-slot": "dropdown-menu-portal",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuTrigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
			"data-slot": "dropdown-menu-content",
			className: cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuLabel({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroupLabel, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("px-3 py-2.5 text-xs text-muted-foreground data-inset:pl-9.5", className),
		...props
	});
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("group/dropdown-menu-item relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className),
		...props
	});
}
function DropdownMenuSub({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubmenuRoot, {
		"data-slot": "dropdown-menu-sub",
		...props
	});
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuSubmenuTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		className: cn("flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
	});
}
function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: cn("w-auto min-w-36 rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		align,
		alignOffset,
		side,
		sideOffset,
		...props
	});
}
function DropdownMenuRadioGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...props
	});
}
function DropdownMenuRadioItem({ className, children, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuRadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		"data-inset": inset,
		className: cn("relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute right-2 flex items-center justify-center",
			"data-slot": "dropdown-menu-radio-item-indicator",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRadioItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-2 fill-current mr-1" }) })
		}), children]
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border/50", className),
		...props
	});
}
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-popover-foreground ring-1 ring-foreground/5 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "alert-dialog-title",
		className: cn("font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		"data-slot": "alert-dialog-action",
		className: cn(className),
		...props
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		"data-slot": "alert-dialog-cancel",
		className: cn(className),
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant,
			size
		}),
		...props
	});
}
function Header() {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();
	const location = useLocation();
	const { theme, setTheme } = useTheme();
	const [showLogoutDialog, setShowLogoutDialog] = (0, import_react.useState)(false);
	const [isLoggingOut, setIsLoggingOut] = (0, import_react.useState)(false);
	const handleLogout = async () => {
		setIsLoggingOut(true);
		await authClient.signOut();
		setShowLogoutDialog(false);
		setIsLoggingOut(false);
		navigate({ to: "/auth/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed top-2 left-0 right-0 z-50 flex justify-center items-center max-w-7xl mx-auto px-6 w-full pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center justify-between w-full pointer-events-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 flex justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center justify-center transition-transform hover:scale-[1.05] active:scale-[0.95]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/vedasync.png",
							alt: "Vedasync Logo",
							className: "h-16 w-16 object-contain"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-none hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full px-2 py-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: `text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname === "/" ? "bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"}`,
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: `text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname.startsWith("/about") ? "bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"}`,
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: `text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ease-out ${location.pathname.startsWith("/contact") ? "bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"}`,
								children: "Contact"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full p-1.5 h-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.04]",
						children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 px-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-24 bg-black/5 dark:bg-white/10 rounded-full animate-pulse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2",
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 bg-black/5 dark:bg-white/10 rounded-full animate-pulse" })
							]
						}) : session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							session.user.role && session.user.role !== "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/dashboard/${session.user.role}`,
								className: "text-sm font-medium text-zinc-600 bg-blue-400 dark:bg-blue-600 text-zinc-900 dark:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out",
								children: "Dashboard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2",
								children: "|"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								className: "focus:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300 ease-out",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {
											name: session.user.name || "user",
											animate: "always"
										})
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								className: "w-56 mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
										className: "flex flex-col space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium leading-none",
											children: session.user.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs leading-none text-zinc-500",
											children: session.user.email
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, {
										className: "cursor-pointer",
										children: [theme === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "mr-2 h-4 w-4" }) : theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Theme" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioGroup, {
										value: theme,
										onValueChange: (val) => setTheme(val),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem, {
												value: "light",
												className: "cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Light" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem, {
												value: "dark",
												className: "cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dark" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem, {
												value: "system",
												className: "cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "System Default" })]
											})
										]
									}) }) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setShowLogoutDialog(true),
										className: "cursor-pointer text-red-600 focus:text-red-600 dark:text-red-500 dark:focus:text-red-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Log out" })]
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
								open: showLogoutDialog,
								onOpenChange: setShowLogoutDialog,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Are you sure you want to log out?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "You will be redirected to the login page." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
										className: "border-t border-border p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
											className: "rounded-md",
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
											onClick: handleLogout,
											disabled: isLoggingOut,
											className: "bg-red-600 text-white hover:bg-red-700 rounded-md min-w-[100px]",
											children: isLoggingOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Logging out..."] }) : "Log out"
										})]
									})]
								})
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/login",
								className: "text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 ease-out",
								children: "Login"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-zinc-600 dark:text-zinc-300 px-2",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/signup",
								className: "text-sm font-medium px-5 py-2 bg-primary text-white rounded-full hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-300 ease-out",
								children: "Sign up"
							})
						] })
					})
				})
			]
		})
	});
}
//#endregion
export { Header };
