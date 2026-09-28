import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { cn } from "../_libs/cn.mjs";
import { require_dist } from "../_libs/rive-app__react-canvas.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-DnCkpH7u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var { useRive, Layout, Fit, Alignment } = (/* @__PURE__ */ __toESM(require_dist())).default;
var RiveWrapper = import_react.memo(({ src, stateMachine }) => {
	const { RiveComponent } = useRive({
		src,
		stateMachine,
		autoplay: true,
		layout: new Layout({
			fit: Fit.Cover,
			alignment: Alignment.Center
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiveComponent, { className: "w-full h-full" });
});
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Label, RiveWrapper };
