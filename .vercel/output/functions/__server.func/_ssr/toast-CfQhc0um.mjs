import "../_runtime.mjs";
import { Input, createToastManager, require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { cn } from "../_libs/cn.mjs";
import "./button-CAKNm_4Y.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-sm border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
var toast = createToastManager();
//#endregion
export { Input$1, toast };
