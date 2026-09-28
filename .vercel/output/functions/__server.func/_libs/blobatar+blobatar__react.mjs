import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "./@base-ui/react+[...].mjs";
//#region node_modules/.pnpm/blobatar@2.7.0_react@19.3.0/node_modules/blobatar/dist/react.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var G = (t, e) => `mo-root${t === "always" ? " mo-always" : ""}${e ? " mo-expr" : ""}`;
function It(t) {
	let e = Math.round(t.num("motion.blink", 3500, 6500)), n = Math.round(t.num("motion.saccade", 4200, 7600)), a = t.num("motion.lookX", 1, 2.2), o = t.num("motion.lookY", .8, 1.7), r = (s) => Math.round(s * 100) / 100;
	return {
		phase: Math.round(t.num("motion.phase", 0, 2800)),
		bob: Math.round(t.num("motion.bob", 0, 3400)),
		blink: e,
		blinkPhase: Math.round(t.num("motion.blinkPhase", 0, e)),
		saccade: n,
		saccadePhase: Math.round(t.num("motion.saccadePhase", 0, n)),
		lookX: r(a) * (t.bool("motion.lookXFlip") ? -1 : 1),
		lookY: r(o) * (t.bool("motion.lookYFlip") ? -1 : 1),
		lookMX: r(a),
		lookMY: r(o)
	};
}
function N(t) {
	let e = (a) => `${-a}ms`, n = It(t);
	return {
		"--mo-phase": e(n.phase),
		"--mo-bob-phase": e(n.bob),
		"--mo-blink": `${n.blink}ms`,
		"--mo-blink-phase": e(n.blinkPhase),
		"--mo-look-x": String(n.lookX),
		"--mo-look-mx": String(n.lookMX),
		"--mo-look-y": String(n.lookY),
		"--mo-look-my": String(n.lookMY),
		"--mo-saccade": `${n.saccade}ms`,
		"--mo-saccade-phase": e(n.saccadePhase)
	};
}
function R({ l: t, c: e, h: n }) {
	let a = n * Math.PI / 180, o = e * Math.cos(a), r = e * Math.sin(a), s = t + .3963377774 * o + .2158037573 * r, c = t - .1055613458 * o - .0638541728 * r, i = t - .0894841775 * o - 1.291485548 * r, u = s * s * s, m = c * c * c, l = i * i * i;
	return [
		4.0767416621 * u - 3.3077115913 * m + .2309699292 * l,
		-1.2684380046 * u + 2.6097574011 * m - .3413193965 * l,
		-.0041960863 * u - .7034186147 * m + 1.707614701 * l
	];
}
var U = (t) => t.every((e) => e >= -1e-4 && e <= 1.0001);
function Q(t) {
	let e = R(t);
	if (!U(e)) {
		let n = 0, a = t.c;
		for (let o = 0; o < 12; o++) {
			let r = (n + a) / 2;
			if (U(R({
				...t,
				c: r
			}))) n = r;
			else a = r;
		}
		e = R({
			...t,
			c: n
		});
	}
	return e.map((n) => Math.min(1, Math.max(0, n)));
}
function q(t) {
	let [e, n, a] = Q(t);
	return .2126 * e + .7152 * n + .0722 * a;
}
function B(t, e) {
	let n = q(t), a = q(e);
	return (Math.max(n, a) + .05) / (Math.min(n, a) + .05);
}
function v(t, e, n) {
	if (B(t, e) >= n) return t;
	let a = t.l >= e.l ? 1 : -1;
	for (let s of [a, -a]) {
		let c = { ...t };
		for (let i = 0; i < 60; i++) {
			if (c.l = Math.min(1, Math.max(0, c.l + s * .02)), B(c, e) >= n) return c;
			if (c.l === 0 || c.l === 1) break;
		}
	}
	let o = {
		...t,
		l: 0,
		c: 0
	}, r = {
		...t,
		l: 1,
		c: 0
	};
	return B(o, e) >= B(r, e) ? o : r;
}
function T(t) {
	return "#" + Q(t).map((e) => {
		let n = e <= .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .4166666666666667) - .055;
		return Math.round(n * 255).toString(16).padStart(2, "0");
	}).join("");
}
var K = [
	[.2, {
		l: .86,
		c: .085
	}],
	[.36, {
		l: .9,
		c: .028
	}],
	[.62, {
		l: .73,
		c: .135
	}],
	[.8, {
		l: .62,
		c: .165
	}],
	[.93, {
		l: .87,
		c: .16
	}],
	[1, {
		l: .34,
		c: .035
	}]
];
var At = (t) => K.find(([e]) => t < e)?.[1] ?? K[0][1];
var J = {
	l: .145,
	c: 0,
	h: 0
};
var W = 1.5;
var Rt = (t, e) => {
	let n = At(e), a = v({
		l: n.l,
		c: n.c,
		h: t
	}, J, W);
	return {
		bg: {
			l: .965,
			c: .01,
			h: t
		},
		head: a,
		eye: a.l >= .5 ? {
			l: .17,
			c: .02,
			h: t
		} : {
			l: .97,
			c: .012,
			h: t
		}
	};
};
var Ht = [[
	"head",
	"bg",
	1.25
], [
	"eye",
	"head",
	4.5
]];
function Ft(t, e = !0, n = 0) {
	let a = Rt(t, n);
	if (e) for (let [o, r, s] of Ht) a[o] = v(a[o], a[r], s);
	return a;
}
function tt(t, e = !0, n = 0) {
	let a = Ft(t, e, n), o = {};
	for (let r in a) o[r] = T(a[r]);
	return o;
}
var y = (t) => {
	let e = Math.round(t * 100) / 100;
	return Object.is(e, -0) ? "0" : String(e);
};
function P({ cx: t, cy: e, rx: n, ry: a, n: o = 4, rot: r = 0 }) {
	let s = Math.min(1, (8 * Math.pow(2, -1 / o) - 4) / 3), c = n, i = a, u = c * s, m = i * s, l = [
		[c, 0],
		[c, m],
		[u, i],
		[0, i],
		[-u, i],
		[-c, m],
		[-c, 0],
		[-c, -m],
		[-u, -i],
		[0, -i],
		[u, -i],
		[c, -m],
		[c, 0]
	], b = r * Math.PI / 180, p = Math.cos(b), d = Math.sin(b), g = (x) => {
		let [f, M] = l[x];
		return `${y(t + f * p - M * d)} ${y(e + f * d + M * p)}`;
	}, h = `M${g(0)}`;
	for (let x = 1; x < 13; x += 3) h += `C${g(x)} ${g(x + 1)} ${g(x + 2)}`;
	return h + "Z";
}
function et(t, e, n, a, o, r = 0) {
	let s = o.length, c = r * Math.PI / 180, i = o.map((l, b) => {
		let p = c + 2 * Math.PI * b / s;
		return [t + n * l * Math.cos(p), e + a * l * Math.sin(p)];
	}), u = (l) => i[(l % s + s) % s], m = `M${y(u(0)[0])} ${y(u(0)[1])}`;
	for (let l = 0; l < s; l++) {
		let [b, p] = u(l - 1), [d, g] = u(l), [h, x] = u(l + 1), [f, M] = u(l + 2);
		m += `C${y(d + (h - b) / 6)} ${y(g + (x - p) / 6)} ${y(h - (f - d) / 6)} ${y(x - (M - g) / 6)} ${y(h)} ${y(x)}`;
	}
	return m + "Z";
}
function nt({ cx: t, cy: e, rx: n, ry: a, sides: o, round: r = .3, rot: s = 0 }) {
	let c = r > 0 ? r < 1 ? r / 2 : .5 : 0, i = s * Math.PI / 180 - Math.PI / 2, u = Array.from({ length: o }, (p, d) => {
		let g = i + 2 * Math.PI * d / o;
		return [t + n * Math.cos(g), e + a * Math.sin(g)];
	}), m = (p) => u[(p % o + o) % o], l = (p, d) => {
		let [g, h] = m(p), [x, f] = m(d);
		return `${y(g + (x - g) * c)} ${y(h + (f - h) * c)}`;
	}, b = `M${l(0, -1)}`;
	for (let p = 0; p < o; p++) {
		let [d, g] = m(p);
		if (b += `Q${y(d)} ${y(g)} ${l(p, p + 1)}`, c < .5) b += `L${l(p + 1, p)}`;
	}
	return b + "Z";
}
function rt(t, e, n, a) {
	let o = y(t - n), r = y(t + n);
	return `M${o} ${y(e - a)}H${r}V${y(e + a)}H${o}Z`;
}
function ot(t, e, n, a, o) {
	let r = Math.max(1.05, o), s = n * Math.sqrt(1 - 1 / (r * r)), c = e - a / r, i = e - r * a, u = s * .14, m = c + .86 * (i - c);
	return `M${y(t - s)} ${y(c)}L${y(t - u)} ${y(m)}Q${y(t)} ${y(i)} ${y(t + u)} ${y(m)}L${y(t + s)} ${y(c)}Z`;
}
function H(t, e) {
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e[n], 3432918353), t = t << 13 | t >>> 19;
	return t;
}
function jt(t) {
	return t = Math.imul(t ^ t >>> 16, 2246822507), t = Math.imul(t ^ t >>> 13, 3266489909), (t ^ t >>> 16) >>> 0;
}
var at = new TextEncoder();
function _t(t) {
	return t.normalize("NFC").trim().toLowerCase();
}
function st(t, e = !0) {
	let n = e ? _t(t) : t;
	return H(1779033703 ^ n.length, at.encode(n));
}
function F(t, e) {
	return jt(H(H(t, Uint8Array.of(255)), at.encode(e))) / 4294967296;
}
function ct(t, e = !0, n) {
	let a = st(t, e), o = (r) => {
		let s = n?.[r], c = Array.isArray(s) ? s[Math.floor(F(a, r) * s.length)] : s;
		return c === void 0 ? F(a, r) : c > 0 ? c < 1 ? c : .999999 : 0;
	};
	return o.num = (r, s, c) => s + o(r) * (c - s), o.int = (r, s, c) => s + Math.floor(o(r) * (c - s + 1)), o.pick = (r, s) => s[Math.floor(o(r) * s.length)], o.bool = (r, s = .5) => o(r) < s, o.jitter = (r, s) => (o(r) * 2 - 1) * s, o;
}
function I(t, e, n) {
	let a = e.expression;
	if (n || !a) return {
		l: t,
		wrap: ""
	};
	return a.bake(t, a.p);
}
var j = (t, e) => e?.tint ? e.tint(t, e.p) : t;
var it = (t, e) => e ? `<g transform="${e}">${t}</g>` : t;
var Ct = (t) => t.replace(/[&<>]/g, (e) => e === "&" ? "&amp;" : e === "<" ? "&lt;" : "&gt;");
function O(t, e) {
	let n = ct(t, e.normalize ?? !0, e.traits);
	return {
		t: n,
		palette: {
			...tt(e.hue ?? n.num("hue", 0, 360), e.contrast ?? !0, e.tone ?? n("tone")),
			...e.palette
		}
	};
}
var Vt = (t) => t.title ? `<title>${Ct(t.title)}</title>` : "";
function w(t, e, n) {
	let a = e.background ?? t.background;
	if (a === !1) return;
	return {
		d: a === "square" ? "M0 0H100V100H0Z" : P({
			cx: 50,
			cy: 50,
			rx: 50,
			ry: 50,
			n: a === "circle" ? 2 : 6
		}),
		fill: n.bg
	};
}
var Xt = (t) => t ? `<path d="${t.d}" fill="${t.fill}"/>` : "";
function lt(t) {
	return (e, n = {}) => {
		let { t: a, palette: o } = O(e, n), r = j(o, n.expression), s = n.size ? ` width="${n.size}" height="${n.size}"` : "", c = I(t.layout(a), n);
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${s}>${Vt(n) + Xt(w(t, n, r)) + it(t.render(c.l, r), c.wrap)}</svg>`;
	};
}
function ut(t) {
	return (e, n = {}, a) => {
		let { t: o, palette: r } = O(e, n), s = a?.(o, r), c = I(t.layout(o), n, s);
		return {
			cls: s?.cls,
			bg: w(t, n, r),
			inner: it(t.render(c.l, r, !!s), c.wrap),
			vars: s?.vars
		};
	};
}
var mt = (t, e, n) => {
	let a = e.rx, o = t.num("eye.rx", .075, .105) * a, r = t.num("eye.ratio", 1.9, 3.2), s = t.num("eye.scale", .78, 1.24), c = t.num("eye.stretch", .85, 1.18), i = t.num("eye.gap", .1, .24) * a, u = o * Math.max(1, s), m = o * r * Math.max(1, s * c), l = u + a * .03 + i, b = t.jitter("gaze.x", .09) * n.rx, p = t.num("gaze.y", -.2, .08) * n.ry, d = t.jitter("eye.dy", .04) * n.ry, g = Math.hypot(u, m), h = Math.hypot((Math.abs(b) + l + g) / n.rx, (Math.abs(p) + Math.abs(d) + g) / n.ry), x = h > .9 ? .9 / h : 1, f = o * x, M = f * r, L = l * x, A = Math.max(0, Math.min(1, i / m)), Lt = Math.min(12, Math.asin(A) * 180 / Math.PI), X = t.num("eye.lean", -1, 1) * Lt, vt = Math.max(-12, Math.min(12, X + t.jitter("eye.lean2", 3.5))), Y = n.cx + b * x, z = n.cy + p * x;
	return [{
		cx: Y - L,
		cy: z,
		rx: f,
		ry: M,
		n: t.num("eye.n", 3.5, 6),
		rot: X
	}, {
		cx: Y + L,
		cy: z + d * x,
		rx: f * s,
		ry: M * s * c,
		n: t.num("eye.n", 3.5, 6),
		rot: vt
	}];
};
function pt(t, e) {
	let n = (r) => (t.find(([, s]) => r < s) ?? t[t.length - 1])[0];
	function a(r) {
		let s = n(r("shape")), c = r.num("body.r", 31, 38) * s.core, i = {
			cx: 50 + r.jitter("body.x", 1.5),
			cy: 50 + r.jitter("body.y", 1.5),
			rx: c,
			ry: c * r.num("body.ratio", .92, 1.08),
			n: r.num("body.n", 1.9, 2.5),
			rot: 0,
			radii: Array.from({ length: r.int("body.pts", 6, 8) }, (l, b) => 1 + r.jitter(`body.r${b}`, .16))
		};
		s.body?.(r, i);
		let u = s.face?.(i) ?? i, m = {
			petals: [],
			extra: []
		};
		return s.decorate?.(r, i, m), {
			shape: s.name,
			draw: s.path,
			body: i,
			face: u,
			petals: m.petals,
			extra: m.extra,
			eyes: e(r, i, u)
		};
	}
	function o(r, s, c) {
		let i = (l) => Math.round(l * 100) / 100, u = (l, b) => {
			let p = `<path d="${P(l)}"/>`;
			return c ? `<g class="mo-eye" style="--mo-wrap:${b ? 1 : -1};--mo-lean:${i(l.rot)};transform-origin:${i(l.cx)}px ${i(l.cy)}px">${p}</g>` : p;
		}, m = `<g fill="${s.head}">` + r.petals.map((l) => `<circle cx="${i(l.cx)}" cy="${i(l.cy)}" r="${i(l.r)}"/>`).join("") + r.extra.map((l) => `<path d="${l}"/>`).join("") + `<path d="${r.draw ? r.draw(r.body) : P(r.body)}"/></g><g fill="${s.eye}"${c ? " class=\"mo-eyes\"" : ""}>` + r.eyes.map(u).join("") + "</g>";
		return c ? `<g class="mo-breathe"><g class="mo-bob">${m}</g></g>` : m;
	}
	return {
		layout: a,
		render: o,
		background: !1
	};
}
var yt = (t) => nt(t);
var bt = (t) => et(t.cx, t.cy, t.rx, t.ry, t.radii, t.rot);
var C = (t) => (e) => ({
	cx: e.cx,
	cy: e.cy,
	rx: e.rx * t,
	ry: e.ry * t
});
var ht = (t) => C(Math.min(...t.radii) * .95)(t);
var Yt = (t) => C(.84)(t);
var xt = {
	name: "round",
	core: 1
};
var dt = {
	name: "organic",
	core: .98,
	path: bt,
	face: ht
};
var gt = {
	name: "boxy",
	core: .86,
	body: (t, e) => {
		e.n = t.num("body.n", 3.4, 6), e.rot = t.num("body.rot", -20, 20);
	}
};
var ft = {
	name: "capsule",
	core: 1.02,
	body: (t, e) => {
		e.ry *= t.num("capsule.squat", .55, .68);
	},
	face: C(.94),
	decorate: (t, e, n) => {
		for (let a of [-1, 1]) n.petals.push({
			cx: e.cx + a * (e.rx - e.ry),
			cy: e.cy,
			r: e.ry
		});
	},
	path: (t) => rt(t.cx, t.cy, t.rx - t.ry, t.ry)
};
var k = pt([
	[xt, .22],
	[dt, .48],
	[gt, .6],
	[ft, .7],
	[{
		name: "nub",
		core: .88,
		decorate: (t, e, n) => {
			let a = t.int("nub.n", 1, 2);
			for (let o = 0; o < a; o++) {
				let r = t.num(`nub.a${o}`, 0, 2 * Math.PI);
				n.petals.push({
					cx: e.cx + Math.cos(r) * e.rx * .88,
					cy: e.cy + Math.sin(r) * e.rx * .88,
					r: e.rx * t.num(`nub.r${o}`, .24, .4)
				});
			}
		}
	}, .79],
	[{
		name: "cloud",
		core: .78,
		face: ht,
		path: bt,
		decorate: (t, e, n) => {
			let a = t.int("cloud.n", 4, 6);
			for (let o = 0; o < a; o++) {
				let r = Math.PI + Math.PI * (o + .5) / a;
				n.petals.push({
					cx: e.cx + Math.cos(r) * e.rx * .8,
					cy: e.cy + Math.sin(r) * e.rx * .5,
					r: e.rx * t.num(`cloud.r${o}`, .44, .62)
				});
			}
		}
	}, .86],
	[{
		name: "droplet",
		core: .78,
		body: (t, e) => {
			e.cy += .22 * e.ry, e.n = 2;
		},
		face: (t) => ({
			cx: t.cx,
			cy: t.cy + t.ry * .05,
			rx: t.rx * .88,
			ry: t.ry * .88
		}),
		decorate: (t, e, n) => {
			n.extra.push(ot(e.cx, e.cy, e.rx, e.ry, t.num("droplet.tip", 1.4, 1.65)));
		}
	}, .915],
	[{
		name: "hexagon",
		core: 1.05,
		path: yt,
		face: Yt,
		body: (t, e) => {
			e.sides = 6, e.rot = t.num("body.rot", -12, 12), e.round = t.num("poly.round", .24, .5);
		}
	}, .95],
	[{
		name: "sun",
		core: .7,
		decorate: (t, e, n) => {
			let a = t.int("sun.n", 6, 9), o = e.rx * t.num("sun.dist", 1, 1.08), r = e.rx * t.num("sun.r", .2, .26), s = t.num("sun.rot", 0, 2 * Math.PI);
			for (let c = 0; c < a; c++) {
				let i = s + 2 * Math.PI * c / a;
				n.petals.push({
					cx: e.cx + Math.cos(i) * o,
					cy: e.cy + Math.sin(i) * o,
					r
				});
			}
		}
	}, .98],
	[{
		name: "triangle",
		core: 1.15,
		path: yt,
		body: (t, e) => {
			e.sides = 3, e.rot = t.num("body.rot", -5, 5), e.round = t.num("poly.round", .24, .5);
		},
		face: (t) => ({
			cx: t.cx,
			cy: t.cy + t.ry * .1,
			rx: t.rx * .54,
			ry: t.ry * .36
		})
	}, 1]
], mt);
var Bt = lt(k);
var Gt = (t, e) => (n, a) => {
	let o = e ? e.vars(e.p) : {}, r = e?.tint ? e.tint(a, e.p) : a;
	return {
		cls: G(t, !!Object.keys(o).length || !!e?.tint),
		vars: {
			...N(n),
			"--mo-head": r.head,
			"--mo-eye": r.eye,
			...o
		}
	};
};
function Tt(t, e = {}) {
	return ut(k)(t, e, e.animate && Gt(e.animate, e.expression));
}
function wt(t, e) {
	return "data:image/svg+xml," + Bt(t, e).replace(/"/g, "'").replace(/[%#<>{}|\\^[\]`]/g, (a) => "%" + a.charCodeAt(0).toString(16).toUpperCase()).replace(/\s+/g, " ");
}
function Le({ name: t, size: e, background: n, palette: a, hue: o, tone: r, normalize: s, contrast: c, title: i, animate: u, expression: m, traits: l, ...b }) {
	let p = {
		size: e,
		background: n,
		palette: a,
		hue: o,
		tone: r,
		normalize: s,
		contrast: c,
		title: i,
		expression: m,
		traits: l
	}, d = JSON.stringify([
		t,
		p,
		u
	]), g = (0, import_react.useMemo)(() => u ? "" : wt(t, p), [d]), h = (0, import_react.useMemo)(() => u ? Tt(t, {
		...p,
		animate: u
	}) : null, [d]), x = (0, import_react.useMemo)(() => ({ __html: h?.inner ?? "" }), [h?.inner]);
	if (h) {
		let { style: L, ...A } = b;
		return (0, import_jsx_runtime.jsxs)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 100 100",
			width: e,
			height: e,
			role: i ? "img" : void 0,
			"aria-hidden": i ? void 0 : !0,
			style: {
				...h.vars,
				...L
			},
			...A,
			children: [
				i ? (0, import_jsx_runtime.jsx)("title", { children: i }) : null,
				h.bg ? (0, import_jsx_runtime.jsx)("path", {
					d: h.bg.d,
					fill: h.bg.fill
				}) : null,
				(0, import_jsx_runtime.jsx)("g", {
					className: h.cls,
					dangerouslySetInnerHTML: x
				})
			]
		});
	}
	let { alt: f, ...M } = b;
	return (0, import_jsx_runtime.jsx)("img", {
		src: g,
		width: e,
		height: e,
		alt: f ?? i ?? "",
		...M
	});
}
//#endregion
//#region node_modules/.pnpm/@blobatar+react@2.7.0_blobatar@2.7.0_react@19.3.0__react@19.3.0/node_modules/@blobatar/react/dist/index.js
var r = Le;
//#endregion
export { r };
