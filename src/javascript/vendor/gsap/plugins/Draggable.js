/*!
 * VERSION: 0.14.1
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership. 
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function(e, t, o) {
            var n, r, i, a, s, l, c, f, d = {
                    css: {}
                },
                p = {
                    css: {}
                },
                h = {
                    css: {}
                },
                u = {
                    css: {}
                },
                g = _gsScope._gsDefine.globals,
                x = {},
                m = document,
                v = m.documentElement || {},
                y = function(e) {
                    return m.createElementNS ? m.createElementNS("http://www.w3.org/1999/xhtml", e) : m.createElement(e)
                },
                w = y("div"),
                b = [],
                T = function() {
                    return !1
                },
                S = 180 / Math.PI,
                L = 999999999999999,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                N = !(m.addEventListener || !m.all),
                M = m.createElement("div"),
                D = [],
                P = {},
                _ = 0,
                k = /^(?:a|input|textarea|button|select)$/i,
                X = 0,
                Y = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
                B = 0,
                O = {},
                R = {},
                E = function(e) {
                    if ("string" == typeof e && (e = t.selector(e)), !e || e.nodeType) return [e];
                    var o, n = [],
                        r = e.length;
                    for (o = 0; o !== r; n.push(e[o++]));
                    return n
                },
                W = function() {
                    for (var e = D.length; --e > -1;) D[e]()
                },
                A = function(e) {
                    D.push(e), 1 === D.length && t.ticker.addEventListener("tick", W, this, !1, 1)
                },
                F = function(e) {
                    for (var o = D.length; --o > -1;) D[o] === e && D.splice(o, 1);
                    t.to(H, 0, {
                        overwrite: "all",
                        delay: 15,
                        onComplete: H
                    })
                },
                H = function() {
                    D.length || t.ticker.removeEventListener("tick", W)
                },
                V = function(e, t) {
                    var o;
                    for (o in t) void 0 === e[o] && (e[o] = t[o]);
                    return e
                },
                I = function() {
                    return null != window.pageYOffset ? window.pageYOffset : null != m.scrollTop ? m.scrollTop : v.scrollTop || m.body.scrollTop || 0
                },
                G = function() {
                    return null != window.pageXOffset ? window.pageXOffset : null != m.scrollLeft ? m.scrollLeft : v.scrollLeft || m.body.scrollLeft || 0
                },
                z = function(e, t) {
                    Xe(e, "scroll", t), $(e.parentNode) || z(e.parentNode, t)
                },
                U = function(e, t) {
                    Ye(e, "scroll", t), $(e.parentNode) || U(e.parentNode, t)
                },
                $ = function(e) {
                    return !(e && e !== v && e !== m && e !== m.body && e !== window && e.nodeType && e.parentNode)
                },
                K = function(e, t) {
                    var o = "x" === t ? "Width" : "Height",
                        n = "scroll" + o,
                        r = "client" + o,
                        i = m.body;
                    return Math.max(0, $(e) ? Math.max(v[n], i[n]) - (window["inner" + o] || v[r] || i[r]) : e[n] - e[r])
                },
                Z = function(e) {
                    var t = $(e),
                        o = K(e, "x"),
                        n = K(e, "y");
                    t ? e = R : Z(e.parentNode), e._gsMaxScrollX = o, e._gsMaxScrollY = n, e._gsScrollX = e.scrollLeft || 0, e._gsScrollY = e.scrollTop || 0
                },
                j = function(e, t) {
                    return e = e || window.event, x.pageX = e.clientX + m.body.scrollLeft + v.scrollLeft, x.pageY = e.clientY + m.body.scrollTop + v.scrollTop, t && (e.returnValue = !1), x
                },
                q = function(e) {
                    return e ? ("string" == typeof e && (e = t.selector(e)), e.length && e !== window && e[0] && e[0].style && !e.nodeType && (e = e[0]), e === window || e.nodeType && e.style ? e : null) : e
                },
                Q = function(e, t) {
                    var o, r, i, a = e.style;
                    if (void 0 === a[t]) {
                        for (i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5, o = t.charAt(0).toUpperCase() + t.substr(1); --r > -1 && void 0 === a[i[r] + o];);
                        if (0 > r) return "";
                        n = 3 === r ? "ms" : i[r], t = n + o
                    }
                    return t
                },
                J = function(e, t, o) {
                    var n = e.style;
                    n && (void 0 === n[t] && (t = Q(e, t)), null == o ? n.removeProperty ? n.removeProperty(t.replace(/([A-Z])/g, "-$1").toLowerCase()) : n.removeAttribute(t) : void 0 !== n[t] && (n[t] = o))
                },
                ee = m.defaultView ? m.defaultView.getComputedStyle : T,
                te = /(?:Left|Right|Width)/i,
                oe = /(?:\d|\-|\+|=|#|\.)*/g,
                ne = function(e, t, o, n, r) {
                    if ("px" === n || !n) return o;
                    if ("auto" === n || !o) return 0;
                    var i, a = te.test(t),
                        s = e,
                        l = w.style,
                        c = 0 > o;
                    return c && (o = -o), "%" === n && -1 !== t.indexOf("border") ? i = o / 100 * (a ? e.clientWidth : e.clientHeight) : (l.cssText = "border:0 solid red;position:" + ie(e, "position", !0) + ";line-height:0;", "%" !== n && s.appendChild ? l[a ? "borderLeftWidth" : "borderTopWidth"] = o + n : (s = e.parentNode || m.body, l[a ? "width" : "height"] = o + n), s.appendChild(w), i = parseFloat(w[a ? "offsetWidth" : "offsetHeight"]), s.removeChild(w), 0 !== i || r || (i = ne(e, t, o, n, !0))), c ? -i : i
                },
                re = function(e, t) {
                    if ("absolute" !== ie(e, "position", !0)) return 0;
                    var o = "left" === t ? "Left" : "Top",
                        n = ie(e, "margin" + o, !0);
                    return e["offset" + o] - (ne(e, t, parseFloat(n), (n + "").replace(oe, "")) || 0)
                },
                ie = function(e, t, o) {
                    var n, r = (e._gsTransform || {})[t];
                    return r || 0 === r ? r : (e.style[t] ? r = e.style[t] : (n = ee(e)) ? (r = n.getPropertyValue(t.replace(/([A-Z])/g, "-$1").toLowerCase()), r = r || n.length ? r : n[t]) : e.currentStyle && (r = e.currentStyle[t]), "auto" !== r || "top" !== t && "left" !== t || (r = re(e, t)), o ? r : parseFloat(r) || 0)
                },
                ae = function(e, t, o) {
                    var n = e.vars,
                        r = n[o],
                        i = e._listeners[t];
                    "function" == typeof r && r.apply(n[o + "Scope"] || n.callbackScope || e, n[o + "Params"] || [e.pointerEvent]), i && e.dispatchEvent(t)
                },
                se = function(e, t) {
                    var o, n, r, i = q(e);
                    return i ? Me(i, t) : void 0 !== e.left ? (r = be(t), {
                        left: e.left - r.x,
                        top: e.top - r.y,
                        width: e.width,
                        height: e.height
                    }) : (n = e.min || e.minX || e.minRotation || 0, o = e.min || e.minY || 0, {
                        left: n,
                        top: o,
                        width: (e.max || e.maxX || e.maxRotation || 0) - n,
                        height: (e.max || e.maxY || 0) - o
                    })
                },
                le = function() {
                    if (!m.createElementNS) return a = 0, void(s = !1);
                    var e, t, o, n, r = y("div"),
                        i = m.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        f = y("div"),
                        d = r.style,
                        p = m.body || v;
                    m.body && de && (d.position = f.style.position = "absolute", p.appendChild(f), f.appendChild(r), d.height = "10px", n = r.offsetTop, f.style.border = "5px solid red", c = n !== r.offsetTop, p.removeChild(f)), d = i.style, i.setAttributeNS(null, "width", "400px"), i.setAttributeNS(null, "height", "400px"), i.setAttributeNS(null, "viewBox", "0 0 400 400"), d.display = "block", d.boxSizing = "border-box", d.border = "0px solid red", d.transform = "none", r.style.cssText = "width:100px;height:100px;overflow:scroll", p.appendChild(r), r.appendChild(i), o = i.createSVGPoint().matrixTransform(i.getScreenCTM()), t = o.y, r.scrollTop = 100, o.x = o.y = 0, o = o.matrixTransform(i.getScreenCTM()), l = 100.1 > t - o.y ? 0 : t - o.y - 150, r.removeChild(i), p.removeChild(r), p.appendChild(i), e = i.getScreenCTM(), t = e.e, d.border = "50px solid red", e = i.getScreenCTM(), 0 === t && 0 === e.e && 0 === e.f && 1 === e.a ? (a = 1, s = !0) : (a = t !== e.e ? 1 : 0, s = 1 !== e.a), p.removeChild(i)
                },
                ce = "" !== Q(w, "perspective"),
                fe = Q(w, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                de = Q(w, "transform"),
                pe = de.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                he = {},
                ue = {},
                ge = window.SVGElement,
                xe = function(e) {
                    return !!(ge && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM))
                },
                me = (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) && 11 > parseFloat(RegExp.$1),
                ve = [],
                ye = [],
                we = function(e) {
                    if (!e.getBoundingClientRect || !e.parentNode || !de) return {
                        offsetTop: 0,
                        offsetLeft: 0,
                        scaleX: 1,
                        scaleY: 1,
                        offsetParent: v
                    };
                    if (Ve.cacheSVGData !== !1 && e._gsCache && e._gsCache.lastUpdate === t.ticker.frame) return e._gsCache;
                    var o, n, r, i, c, f, d, p, h, u, g, x, y = e,
                        w = Te(e);
                    if (w.lastUpdate = t.ticker.frame, e.getBBox && !w.isSVGRoot) {
                        for (y = e.parentNode, o = e.getBBox(); y && "svg" !== (y.nodeName + "").toLowerCase();) y = y.parentNode;
                        return i = we(y), w.offsetTop = o.y * i.scaleY, w.offsetLeft = o.x * i.scaleX, w.scaleX = i.scaleX, w.scaleY = i.scaleY, w.offsetParent = y || v, w
                    }
                    for (r = w.offsetParent, r === m.body && (r = v), ye.length = ve.length = 0; y && (c = ie(y, de, !0), "matrix(1, 0, 0, 1, 0, 0)" !== c && "none" !== c && "translate3d(0px, 0px, 0px)" !== c && (ye.push(y), ve.push(y.style[de]), y.style[de] = "none"), y !== r);) y = y.parentNode;
                    for (n = r.getBoundingClientRect(), c = e.getScreenCTM(), p = e.createSVGPoint(), d = p.matrixTransform(c), p.x = p.y = 10, p = p.matrixTransform(c), w.scaleX = (p.x - d.x) / 10, w.scaleY = (p.y - d.y) / 10, void 0 === a && le(), w.borderBox && !s && e.getAttribute("width") && (i = ee(e) || {}, h = parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth) || 0, u = parseFloat(i.borderTopWidth) + parseFloat(i.borderBottomWidth) || 0, g = parseFloat(i.width) || 0, x = parseFloat(i.height) || 0, w.scaleX *= (g - h) / g, w.scaleY *= (x - u) / x), l ? (o = e.getBoundingClientRect(), w.offsetLeft = o.left - n.left, w.offsetTop = o.top - n.top) : (w.offsetLeft = d.x - n.left, w.offsetTop = d.y - n.top), w.offsetParent = r, f = ye.length; --f > -1;) ye[f].style[de] = ve[f];
                    return w
                },
                be = function(e, o) {
                    if (o = o || {}, !e || e === v || !e.parentNode || e === window) return {
                        x: 0,
                        y: 0
                    };
                    var n = ee(e),
                        r = fe && n ? n.getPropertyValue(fe) : "50% 50%",
                        i = r.split(" "),
                        a = -1 !== r.indexOf("left") ? "0%" : -1 !== r.indexOf("right") ? "100%" : i[0],
                        s = -1 !== r.indexOf("top") ? "0%" : -1 !== r.indexOf("bottom") ? "100%" : i[1];
                    return ("center" === s || null == s) && (s = "50%"), ("center" === a || isNaN(parseFloat(a))) && (a = "50%"), e.getBBox && xe(e) ? (e._gsTransform || (t.set(e, {
                        x: "+=0",
                        overwrite: !1
                    }), void 0 === e._gsTransform.xOrigin && console.log("Draggable requires at least GSAP 1.17.0")), r = e.getBBox(), o.x = e._gsTransform.xOrigin - r.x, o.y = e._gsTransform.yOrigin - r.y) : (e.getBBox && !e.offsetWidth && -1 !== (a + s).indexOf("%") && (e = e.getBBox(), e = {
                        offsetWidth: e.width,
                        offsetHeight: e.height
                    }), o.x = -1 !== a.indexOf("%") ? e.offsetWidth * parseFloat(a) / 100 : parseFloat(a), o.y = -1 !== s.indexOf("%") ? e.offsetHeight * parseFloat(s) / 100 : parseFloat(s)), o
                },
                Te = function(e) {
                    if (Ve.cacheSVGData !== !1 && e._gsCache && e._gsCache.lastUpdate === t.ticker.frame) return e._gsCache;
                    var o, n = e._gsCache = e._gsCache || {},
                        r = ee(e),
                        i = e.getBBox && xe(e),
                        a = "svg" === (e.nodeName + "").toLowerCase();
                    if (n.isSVG = i, n.isSVGRoot = a, n.borderBox = "border-box" === r.boxSizing, n.computedStyle = r, a)(n.offsetParent = e.offsetParent) || (o = e.parentNode || v, o.insertBefore(w, e), n.offsetParent = w.offsetParent || v, o.removeChild(w));
                    else if (i) {
                        for (o = e.parentNode; o && "svg" !== (o.nodeName + "").toLowerCase();) o = o.parentNode;
                        n.offsetParent = o
                    }
                    return n
                },
                Se = function(e, t, o, n) {
                    if (e === window || !e || !e.style || !e.parentNode) return [1, 0, 0, 1, 0, 0];
                    var r, i, s, l, f, d, p, h, u, g, x, y, w, b, T = e._gsCache || Te(e),
                        S = e.parentNode,
                        L = S._gsCache || Te(S),
                        C = T.computedStyle,
                        N = T.isSVG ? L.offsetParent : S.offsetParent;
                    return r = T.isSVG && -1 !== (e.style[de] + "").indexOf("matrix") ? e.style[de] : C ? C.getPropertyValue(pe) : e.currentStyle ? e.currentStyle[de] : "1,0,0,1,0,0", e.getBBox && -1 !== (e.getAttribute("transform") + "").indexOf("matrix") && (r = e.getAttribute("transform")), r = (r + "").match(/(?:\-|\b)[\d\-\.e]+\b/g) || [1, 0, 0, 1, 0, 0], r.length > 6 && (r = [r[0], r[1], r[4], r[5], r[12], r[13]]), n ? r[4] = r[5] = 0 : T.isSVG && (f = e._gsTransform) && (f.xOrigin || f.yOrigin) && (r[0] = parseFloat(r[0]), r[1] = parseFloat(r[1]), r[2] = parseFloat(r[2]), r[3] = parseFloat(r[3]), r[4] = parseFloat(r[4]) - (f.xOrigin - (f.xOrigin * r[0] + f.yOrigin * r[2])), r[5] = parseFloat(r[5]) - (f.yOrigin - (f.xOrigin * r[1] + f.yOrigin * r[3]))), t && (void 0 === a && le(), s = T.isSVG || T.isSVGRoot ? we(e) : e, T.isSVG ? (l = e.getBBox(), g = L.isSVGRoot ? {
                        x: 0,
                        y: 0
                    } : S.getBBox(), s = {
                        offsetLeft: l.x - g.x,
                        offsetTop: l.y - g.y,
                        offsetParent: T.offsetParent
                    }) : T.isSVGRoot ? (x = parseInt(C.borderTopWidth, 10) || 0, y = parseInt(C.borderLeftWidth, 10) || 0, w = (r[0] - a) * y + r[2] * x, b = r[1] * y + (r[3] - a) * x, d = t.x, p = t.y, h = d - (d * r[0] + p * r[2]), u = p - (d * r[1] + p * r[3]), r[4] = parseFloat(r[4]) + h, r[5] = parseFloat(r[5]) + u, t.x -= h, t.y -= u, d = s.scaleX, p = s.scaleY, t.x *= d, t.y *= p, r[0] *= d, r[1] *= p, r[2] *= d, r[3] *= p, me || (t.x += w, t.y += b)) : !c && e.offsetParent && (t.x += parseInt(ie(e.offsetParent, "borderLeftWidth"), 10) || 0, t.y += parseInt(ie(e.offsetParent, "borderTopWidth"), 10) || 0), i = S === v || S === m.body, r[4] = Number(r[4]) + t.x + (s.offsetLeft || 0) - o.x - (i ? 0 : S.scrollLeft || 0), r[5] = Number(r[5]) + t.y + (s.offsetTop || 0) - o.y - (i ? 0 : S.scrollTop || 0), S && "fixed" === ie(e, "position", C) && (r[4] += G(), r[5] += I()), S && S !== v && N === s.offsetParent && (r[4] -= S.offsetLeft || 0, r[5] -= S.offsetTop || 0, c || !S.offsetParent || T.isSVG || T.isSVGRoot || (r[4] -= parseInt(ie(S.offsetParent, "borderLeftWidth"), 10) || 0, r[5] -= parseInt(ie(S.offsetParent, "borderTopWidth"), 10) || 0))), r
                },
                Le = function(e, t) {
                    if (!e || e === window || !e.parentNode) return [1, 0, 0, 1, 0, 0];
                    for (var o, n, r, i, a, s, l, c, f = be(e, he), d = be(e.parentNode, ue), p = Se(e, f, d);
                        (e = e.parentNode) && e.parentNode && e !== v;) f = d, d = be(e.parentNode, f === he ? ue : he), l = Se(e, f, d), o = p[0], n = p[1], r = p[2], i = p[3], a = p[4], s = p[5], p[0] = o * l[0] + n * l[2], p[1] = o * l[1] + n * l[3], p[2] = r * l[0] + i * l[2], p[3] = r * l[1] + i * l[3], p[4] = a * l[0] + s * l[2] + l[4], p[5] = a * l[1] + s * l[3] + l[5];
                    return t && (o = p[0], n = p[1], r = p[2], i = p[3], a = p[4], s = p[5], c = o * i - n * r, p[0] = i / c, p[1] = -n / c, p[2] = -r / c, p[3] = o / c, p[4] = (r * s - i * a) / c, p[5] = -(o * s - n * a) / c), p
                },
                Ce = function(e, t, o, n, r) {
                    e = q(e);
                    var i = Le(e, !1, r),
                        a = t.x,
                        s = t.y;
                    return o && (be(e, t), a -= t.x, s -= t.y), n = n === !0 ? t : n || {}, n.x = a * i[0] + s * i[2] + i[4], n.y = a * i[1] + s * i[3] + i[5], n
                },
                Ne = function(e, t, o) {
                    var n = e.x * t[0] + e.y * t[2] + t[4],
                        r = e.x * t[1] + e.y * t[3] + t[5];
                    return e.x = n * o[0] + r * o[2] + o[4], e.y = n * o[1] + r * o[3] + o[5], e
                },
                Me = function(e, t, o) {
                    if (!(e = q(e))) return null;
                    t = q(t);
                    var n, r, i, a, s, l, c, f, d, p, h, u, g, x, y, w, b, T, S, L, C, M, D = e.getBBox && xe(e);
                    if (e === window) a = I(), r = G(), i = r + (v.clientWidth || e.innerWidth || m.body.clientWidth || 0), s = a + ((e.innerHeight || 0) - 20 < v.clientHeight ? v.clientHeight : e.innerHeight || m.body.clientHeight || 0);
                    else {
                        if (void 0 === t || t === window) return e.getBoundingClientRect();
                        n = be(e), r = -n.x, a = -n.y, D ? (u = e.getBBox(), g = u.width, x = u.height) : e.offsetWidth ? (g = e.offsetWidth, x = e.offsetHeight) : (C = ee(e), g = parseFloat(C.width), x = parseFloat(C.height)), i = r + g, s = a + x, "svg" !== e.nodeName.toLowerCase() || N || (y = we(e), M = y.computedStyle || {}, T = (e.getAttribute("viewBox") || "0 0").split(" "), S = parseFloat(T[0]), L = parseFloat(T[1]), w = parseFloat(M.borderLeftWidth) || 0, b = parseFloat(M.borderTopWidth) || 0, i -= g - (g - w) / y.scaleX - S, s -= x - (x - b) / y.scaleY - L, r -= w / y.scaleX - S, a -= b / y.scaleY - L, C && (i += (parseFloat(M.borderRightWidth) + w) / y.scaleX, s += (b + parseFloat(M.borderBottomWidth)) / y.scaleY))
                    }
                    return e === t ? {
                        left: r,
                        top: a,
                        width: i - r,
                        height: s - a
                    } : (l = Le(e), c = Le(t, !0), f = Ne({
                        x: r,
                        y: a
                    }, l, c), d = Ne({
                        x: i,
                        y: a
                    }, l, c), p = Ne({
                        x: i,
                        y: s
                    }, l, c), h = Ne({
                        x: r,
                        y: s
                    }, l, c), r = Math.min(f.x, d.x, p.x, h.x), a = Math.min(f.y, d.y, p.y, h.y), O.x = O.y = 0, o && be(t, O), {
                        left: r + O.x,
                        top: a + O.y,
                        width: Math.max(f.x, d.x, p.x, h.x) - r,
                        height: Math.max(f.y, d.y, p.y, h.y) - a
                    })
                },
                De = function(e) {
                    return e && e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? !0 : !1
                },
                Pe = function(e) {
                    var t, o, n, r = [],
                        i = e.length;
                    for (t = 0; i > t; t++)
                        if (o = e[t], De(o))
                            for (n = o.length, n = 0; o.length > n; n++) r.push(o[n]);
                        else o && 0 !== o.length && r.push(o);
                    return r
                },
                _e = "ontouchstart" in v && "orientation" in window,
                ke = function(e) {
                    for (var t = e.split(","), o = (void 0 !== w.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== w.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : e).split(","), n = {}, r = 8; --r > -1;) n[t[r]] = o[r], n[o[r]] = t[r];
                    return n
                }("touchstart,touchmove,touchend,touchcancel"),
                Xe = function(e, t, o, n) {
                    e.addEventListener ? e.addEventListener(ke[t] || t, o, n) : e.attachEvent && e.attachEvent("on" + t, o)
                },
                Ye = function(e, t, o) {
                    e.removeEventListener ? e.removeEventListener(ke[t] || t, o) : e.detachEvent && e.detachEvent("on" + t, o)
                },
                Be = function(e, t) {
                    for (var o = e.length; --o > -1;)
                        if (e[o].identifier === t) return !0;
                    return !1
                },
                Oe = function(e) {
                    r = e.touches && e.touches.length > X, Ye(e.target, "touchend", Oe)
                },
                Re = function(e) {
                    r = e.touches && e.touches.length > X, Xe(e.target, "touchend", Oe)
                },
                Ee = function(e, t, o, n, r, i) {
                    var a, s, l, c = {};
                    if (t)
                        if (1 !== r && t instanceof Array) {
                            for (c.end = a = [], l = t.length, s = 0; l > s; s++) a[s] = t[s] * r;
                            o += 1.1, n -= 1.1
                        } else c.end = "function" == typeof t ? function(o) {
                            return t.call(e, o) * r
                        } : t;
                    return (o || 0 === o) && (c.max = o), (n || 0 === n) && (c.min = n), i && (c.velocity = 0), c
                },
                We = function(e) {
                    var t;
                    return e && e.getAttribute && "BODY" !== e.nodeName ? "true" === (t = e.getAttribute("data-clickable")) || "false" !== t && (e.onclick || k.test(e.nodeName + "") || "true" === e.getAttribute("contentEditable")) ? !0 : We(e.parentNode) : !1
                },
                Ae = function(e, t) {
                    for (var o, n = e.length; --n > -1;) o = e[n], o.ondragstart = o.onselectstart = t ? null : T, J(o, "userSelect", t ? "text" : "none")
                },
                Fe = function() {
                    var e, t = m.createElement("div"),
                        o = m.createElement("div"),
                        n = o.style,
                        r = m.body || w;
                    return n.display = "inline-block", n.position = "relative", t.style.cssText = o.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden", t.appendChild(o), r.appendChild(t), f = o.offsetHeight + 18 > t.scrollHeight, n.width = "100%", de || (n.paddingRight = "500px", e = t.scrollLeft = t.scrollWidth - t.clientWidth, n.left = "-90px", e = e !== t.scrollLeft), r.removeChild(t), e
                }(),
                He = function(e, o) {
                    e = q(e), o = o || {};
                    var n, r, i, a, s, l, c = m.createElement("div"),
                        d = c.style,
                        p = e.firstChild,
                        h = 0,
                        u = 0,
                        g = e.scrollTop,
                        x = e.scrollLeft,
                        v = e.scrollWidth,
                        y = e.scrollHeight,
                        w = 0,
                        b = 0,
                        T = 0;
                    ce && o.force3D !== !1 ? (s = "translate3d(", l = "px,0px)") : de && (s = "translate(", l = "px)"), this.scrollTop = function(e, t) {
                        return arguments.length ? void this.top(-e, t) : -this.top()
                    }, this.scrollLeft = function(e, t) {
                        return arguments.length ? void this.left(-e, t) : -this.left()
                    }, this.left = function(n, r) {
                        if (!arguments.length) return -(e.scrollLeft + u);
                        var i = e.scrollLeft - x,
                            a = u;
                        return (i > 2 || -2 > i) && !r ? (x = e.scrollLeft, t.killTweensOf(this, !0, {
                            left: 1,
                            scrollLeft: 1
                        }), this.left(-x), void(o.onKill && o.onKill())) : (n = -n, 0 > n ? (u = 0 | n - .5, n = 0) : n > b ? (u = 0 | n - b, n = b) : u = 0, (u || a) && (s ? this._suspendTransforms || (d[de] = s + -u + "px," + -h + l) : d.left = -u + "px", Fe && u + w >= 0 && (d.paddingRight = u + w + "px")), e.scrollLeft = 0 | n, void(x = e.scrollLeft))
                    }, this.top = function(n, r) {
                        if (!arguments.length) return -(e.scrollTop + h);
                        var i = e.scrollTop - g,
                            a = h;
                        return (i > 2 || -2 > i) && !r ? (g = e.scrollTop, t.killTweensOf(this, !0, {
                            top: 1,
                            scrollTop: 1
                        }), this.top(-g), void(o.onKill && o.onKill())) : (n = -n, 0 > n ? (h = 0 | n - .5, n = 0) : n > T ? (h = 0 | n - T, n = T) : h = 0, (h || a) && (s ? this._suspendTransforms || (d[de] = s + -u + "px," + -h + l) : d.top = -h + "px"), e.scrollTop = 0 | n, void(g = e.scrollTop))
                    }, this.maxScrollTop = function() {
                        return T
                    }, this.maxScrollLeft = function() {
                        return b
                    }, this.disable = function() {
                        for (p = c.firstChild; p;) a = p.nextSibling, e.appendChild(p), p = a;
                        e === c.parentNode && e.removeChild(c)
                    }, this.enable = function() {
                        if (p = e.firstChild, p !== c) {
                            for (; p;) a = p.nextSibling, c.appendChild(p), p = a;
                            e.appendChild(c), this.calibrate()
                        }
                    }, this.calibrate = function(t) {
                        var o, a, s = e.clientWidth === n;
                        g = e.scrollTop, x = e.scrollLeft, (!s || e.clientHeight !== r || c.offsetHeight !== i || v !== e.scrollWidth || y !== e.scrollHeight || t) && ((h || u) && (o = this.left(), a = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), (!s || t) && (d.display = "block", d.width = "auto", d.paddingRight = "0px", w = Math.max(0, e.scrollWidth - e.clientWidth), w && (w += ie(e, "paddingLeft") + (f ? ie(e, "paddingRight") : 0))), d.display = "inline-block", d.position = "relative", d.overflow = "visible", d.verticalAlign = "top", d.width = "100%", d.paddingRight = w + "px", f && (d.paddingBottom = ie(e, "paddingBottom", !0)), N && (d.zoom = "1"), n = e.clientWidth, r = e.clientHeight, v = e.scrollWidth, y = e.scrollHeight, b = e.scrollWidth - n, T = e.scrollHeight - r, i = c.offsetHeight, d.display = "block", (o || a) && (this.left(o), this.top(a)))
                    }, this.content = c, this.element = e, this._suspendTransforms = !1, this.enable()
                },
                Ve = function(n, a) {
                    e.call(this, n), n = q(n), i || (i = g.com.greensock.plugins.ThrowPropsPlugin), this.vars = a = a || {}, this.target = n, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(a.dragResistance) || 0, this.edgeResistance = isNaN(a.edgeResistance) ? 1 : parseFloat(a.edgeResistance) || 0, this.lockAxis = a.lockAxis, this.autoScroll = a.autoScroll || 0, this.lockedAxis = null, this.allowEventDefault = !!a.allowEventDefault;
                    var s, l, c, f, x, y, w, T, D, k, O, W, H, I, G, K, Q, ee, te, oe, ne, re, le, ce, fe, de, pe, he, ue, ge, xe, me, ve = (a.type || (N ? "top,left" : "x,y")).toLowerCase(),
                        ye = -1 !== ve.indexOf("x") || -1 !== ve.indexOf("y"),
                        we = -1 !== ve.indexOf("rotation"),
                        be = we ? "rotation" : ye ? "x" : "left",
                        Te = ye ? "y" : "top",
                        Se = -1 !== ve.indexOf("x") || -1 !== ve.indexOf("left") || "scroll" === ve,
                        Ne = -1 !== ve.indexOf("y") || -1 !== ve.indexOf("top") || "scroll" === ve,
                        Me = a.minimumMovement || 2,
                        De = this,
                        Pe = E(a.trigger || a.handle || n),
                        Oe = {},
                        Fe = 0,
                        Ie = !1,
                        Ge = a.clickableTest || We,
                        ze = function(e) {
                            if (De.autoScroll && De.isDragging && (ee || Ie)) {
                                var t, o, r, i, a, s, c, f, d = n,
                                    p = 15 * De.autoScroll;
                                for (Ie = !1, R.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != v.scrollTop ? v.scrollTop : m.body.scrollTop, R.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != v.scrollLeft ? v.scrollLeft : m.body.scrollLeft, i = De.pointerX - R.scrollLeft, a = De.pointerY - R.scrollTop; d && !o;) o = $(d.parentNode), t = o ? R : d.parentNode, r = o ? {
                                    bottom: Math.max(v.clientHeight, window.innerHeight || 0),
                                    right: Math.max(v.clientWidth, window.innerWidth || 0),
                                    left: 0,
                                    top: 0
                                } : t.getBoundingClientRect(), s = c = 0, Ne && (a > r.bottom - 40 && (f = t._gsMaxScrollY - t.scrollTop) ? (Ie = !0, c = Math.min(f, 0 | p * (1 - Math.max(0, r.bottom - a) / 40))) : r.top + 40 > a && t.scrollTop && (Ie = !0, c = -Math.min(t.scrollTop, 0 | p * (1 - Math.max(0, a - r.top) / 40))), c && (t.scrollTop += c)), Se && (i > r.right - 40 && (f = t._gsMaxScrollX - t.scrollLeft) ? (Ie = !0, s = Math.min(f, 0 | p * (1 - Math.max(0, r.right - i) / 40))) : r.left + 40 > i && t.scrollLeft && (Ie = !0, s = -Math.min(t.scrollLeft, 0 | p * (1 - Math.max(0, i - r.left) / 40))), s && (t.scrollLeft += s)), o && (s || c) && (window.scrollTo(t.scrollLeft, t.scrollTop), rt(De.pointerX + s, De.pointerY + c)), d = t
                            }
                            if (ee) {
                                var h = De.x,
                                    u = De.y,
                                    g = 1e-6;
                                g > h && h > -g && (h = 0), g > u && u > -g && (u = 0), we ? (ue.data.rotation = De.rotation = h, ue.setRatio(1)) : l ? (Ne && l.top(u), Se && l.left(h)) : ye ? (Ne && (ue.data.y = u), Se && (ue.data.x = h), ue.setRatio(1)) : (Ne && (n.style.top = u + "px"), Se && (n.style.left = h + "px")), !T || e || me || (me = !0, ae(De, "drag", "onDrag"), me = !1)
                            }
                            ee = !1
                        },
                        $e = function(e, o) {
                            var r, i = De.x,
                                a = De.y;
                            n._gsTransform || !ye && !we || t.set(n, {
                                x: "+=0",
                                overwrite: !1
                            }), ye ? (De.y = n._gsTransform.y, De.x = n._gsTransform.x) : we ? De.x = De.rotation = n._gsTransform.rotation : l ? (De.y = l.top(), De.x = l.left()) : (De.y = parseInt(n.style.top, 10) || 0, De.x = parseInt(n.style.left, 10) || 0), !oe && !ne || o || (oe && (r = oe(De.x), r !== De.x && (De.x = r, we && (De.rotation = r))), ne && (r = ne(De.y), r !== De.y && (De.y = r))), (i !== De.x || a !== De.y) && ze(!0), e || ae(De, "throwupdate", "onThrowUpdate")
                        },
                        Ke = function() {
                            var e, t, o, r;
                            w = !1, l ? (l.calibrate(), De.minX = k = -l.maxScrollLeft(), De.minY = W = -l.maxScrollTop(), De.maxX = D = De.maxY = O = 0, w = !0) : a.bounds && (e = se(a.bounds, n.parentNode), we ? (De.minX = k = e.left, De.maxX = D = e.left + e.width, De.minY = W = De.maxY = O = 0) : void 0 !== a.bounds.maxX || void 0 !== a.bounds.maxY ? (e = a.bounds, De.minX = k = e.minX, De.minY = W = e.minY, De.maxX = D = e.maxX, De.maxY = O = e.maxY) : (t = se(n, n.parentNode), De.minX = k = ie(n, be) + e.left - t.left, De.minY = W = ie(n, Te) + e.top - t.top, De.maxX = D = k + (e.width - t.width), De.maxY = O = W + (e.height - t.height)), k > D && (De.minX = D, De.maxX = D = k, k = De.minX), W > O && (De.minY = O, De.maxY = O = W, W = De.minY), we && (De.minRotation = k, De.maxRotation = D), w = !0), a.liveSnap && (o = a.liveSnap === !0 ? a.snap || {} : a.liveSnap, r = o instanceof Array || "function" == typeof o, we ? (oe = tt(r ? o : o.rotation, k, D, 1), ne = null) : (Se && (oe = tt(r ? o : o.x || o.left || o.scrollLeft, k, D, l ? -1 : 1)), Ne && (ne = tt(r ? o : o.y || o.top || o.scrollTop, W, O, l ? -1 : 1))))
                        },
                        Ze = function() {
                            De.isThrowing = !1, ae(De, "throwcomplete", "onThrowComplete")
                        },
                        je = function() {
                            De.isThrowing = !1
                        },
                        qe = function(e, t) {
                            var o, r, s, c;
                            e && i ? (e === !0 && (o = a.snap || {}, r = o instanceof Array || "function" == typeof o, e = {
                                resistance: (a.throwResistance || a.resistance || 1e3) / (we ? 10 : 1)
                            }, we ? e.rotation = Ee(De, r ? o : o.rotation, D, k, 1, t) : (Se && (e[be] = Ee(De, r ? o : o.x || o.left || o.scrollLeft, D, k, l ? -1 : 1, t || "x" === De.lockedAxis)), Ne && (e[Te] = Ee(De, r ? o : o.y || o.top || o.scrollTop, O, W, l ? -1 : 1, t || "y" === De.lockedAxis)))), De.isThrowing = !0, c = isNaN(a.overshootTolerance) ? 1 === a.edgeResistance ? 0 : 1 - De.edgeResistance + .2 : a.overshootTolerance, De.tween = s = i.to(l || n, {
                                throwProps: e,
                                ease: a.ease || g.Power3.easeOut,
                                onComplete: Ze,
                                onOverwrite: je,
                                onUpdate: a.fastMode ? ae : $e,
                                onUpdateParams: a.fastMode ? [De, "onthrowupdate", "onThrowUpdate"] : b
                            }, isNaN(a.maxDuration) ? 2 : a.maxDuration, isNaN(a.minDuration) ? 0 === c ? 0 : .5 : a.minDuration, c), a.fastMode || (l && (l._suspendTransforms = !0), s.render(s.duration(), !0, !0), $e(!0, !0), De.endX = De.x, De.endY = De.y, we && (De.endRotation = De.x), s.play(0), $e(!0, !0), l && (l._suspendTransforms = !1))) : w && De.applyBounds()
                        },
                        Qe = function() {
                            ce = Le(n.parentNode, !0), ce[1] || ce[2] || 1 != ce[0] || 1 != ce[3] || 0 != ce[4] || 0 != ce[5] || (ce = null)
                        },
                        Je = function() {
                            var e = 1 - De.edgeResistance;
                            Qe(), l ? (Ke(), y = l.top(), x = l.left()) : (et() ? ($e(!0, !0), Ke()) : De.applyBounds(), we ? (Q = Ce(n, {
                                x: 0,
                                y: 0
                            }), $e(!0, !0), x = De.x, y = De.y = Math.atan2(Q.y - f, c - Q.x) * S) : (pe = n.parentNode ? n.parentNode.scrollTop || 0 : 0, he = n.parentNode ? n.parentNode.scrollLeft || 0 : 0, y = ie(n, Te), x = ie(n, be))), w && e && (x > D ? x = D + (x - D) / e : k > x && (x = k - (k - x) / e), we || (y > O ? y = O + (y - O) / e : W > y && (y = W - (W - y) / e)))
                        },
                        et = function() {
                            return De.tween && De.tween.isActive()
                        },
                        tt = function(e, t, o, n) {
                            return "function" == typeof e ? function(r) {
                                var i = De.isPressed ? 1 - De.edgeResistance : 1;
                                return e.call(De, r > o ? o + (r - o) * i : t > r ? t + (r - t) * i : r) * n
                            } : e instanceof Array ? function(n) {
                                for (var r, i, a = e.length, s = 0, l = L; --a > -1;) r = e[a], i = r - n, 0 > i && (i = -i), l > i && r >= t && o >= r && (s = a, l = i);
                                return e[s]
                            } : isNaN(e) ? function(e) {
                                return e
                            } : function() {
                                return e * n
                            }
                        },
                        ot = function(e) {
                            var o, r;
                            if (s && !De.isPressed && e && !("mousedown" === e.type && 30 > C() - de && ke[De.pointerEvent.type])) {
                                if (fe = et(), De.pointerEvent = e, ke[e.type] ? (le = -1 !== e.type.indexOf("touch") ? e.currentTarget || e.target : m, Xe(le, "touchend", it), Xe(le, "touchmove", nt), Xe(le, "touchcancel", it), Xe(m, "touchstart", Re)) : (le = null, Xe(m, "mousemove", nt)), xe = null, Xe(m, "mouseup", it), e && e.target && Xe(e.target, "mouseup", it), re = Ge.call(De, e.target) && !a.dragClickables) return Xe(e.target, "change", it), ae(De, "press", "onPress"), void Ae(Pe, !0);
                                if (ge = !le || Se === Ne || l || De.vars.allowNativeTouchScrolling === !1 ? !1 : Se ? "y" : "x", N ? e = j(e, !0) : ge || De.allowEventDefault || (e.preventDefault(), e.preventManipulation && e.preventManipulation()), e.changedTouches ? (e = G = e.changedTouches[0], K = e.identifier) : e.pointerId ? K = e.pointerId : G = K = null, X++, A(ze), f = De.pointerY = e.pageY, c = De.pointerX = e.pageX, (ge || De.autoScroll) && Z(n.parentNode), !De.autoScroll || we || l || !n.parentNode || n.getBBox || !n.parentNode._gsMaxScrollX || M.parentNode || (M.style.width = n.parentNode.scrollWidth + "px", n.parentNode.appendChild(M)), Je(), ce && (o = c * ce[0] + f * ce[2] + ce[4], f = c * ce[1] + f * ce[3] + ce[5], c = o), De.tween && De.tween.kill(), De.isThrowing = !1, t.killTweensOf(l || n, !0, Oe), l && t.killTweensOf(n, !0, {
                                        scrollTo: 1
                                    }), De.tween = De.lockedAxis = null, (a.zIndexBoost || !we && !l && a.zIndexBoost !== !1) && (n.style.zIndex = Ve.zIndex++), De.isPressed = !0, T = !(!a.onDrag && !De._listeners.drag), !we)
                                    for (r = Pe.length; --r > -1;) J(Pe[r], "cursor", a.cursor || "move");
                                ae(De, "press", "onPress")
                            }
                        },
                        nt = function(e) {
                            var t, o, n, i, a = e;
                            if (s && !r && De.isPressed && e) {
                                if (De.pointerEvent = e, t = e.changedTouches) {
                                    if (e = t[0], e !== G && e.identifier !== K) {
                                        for (i = t.length; --i > -1 && (e = t[i]).identifier !== K;);
                                        if (0 > i) return
                                    }
                                } else if (e.pointerId && K && e.pointerId !== K) return;
                                if (N) e = j(e, !0);
                                else {
                                    if (le && ge && !xe && (o = e.pageX, n = e.pageY, ce && (i = o * ce[0] + n * ce[2] + ce[4], n = o * ce[1] + n * ce[3] + ce[5], o = i), xe = Math.abs(o - c) > Math.abs(n - f) && Se ? "x" : "y", De.vars.lockAxisOnTouchScroll !== !1 && (De.lockedAxis = "x" === xe ? "y" : "x", "function" == typeof De.vars.onLockAxis && De.vars.onLockAxis.call(De, a)), Y && ge === xe)) return void it(a);
                                    De.allowEventDefault || ge && (!xe || ge === xe) || a.cancelable === !1 || (a.preventDefault(), a.preventManipulation && a.preventManipulation())
                                }
                                De.autoScroll && (Ie = !0), rt(e.pageX, e.pageY)
                            }
                        },
                        rt = function(e, t) {
                            var o, n, r, i, a, s, l = 1 - De.dragResistance,
                                d = 1 - De.edgeResistance;
                            De.pointerX = e, De.pointerY = t, we ? (i = Math.atan2(Q.y - t, e - Q.x) * S, a = De.y - i, De.y = i, a > 180 ? y -= 360 : -180 > a && (y += 360), r = x + (y - i) * l) : (ce && (s = e * ce[0] + t * ce[2] + ce[4], t = e * ce[1] + t * ce[3] + ce[5], e = s), n = t - f, o = e - c, Me > n && n > -Me && (n = 0), Me > o && o > -Me && (o = 0), (De.lockAxis || De.lockedAxis) && (o || n) && (s = De.lockedAxis, s || (De.lockedAxis = s = Se && Math.abs(o) > Math.abs(n) ? "y" : Ne ? "x" : null, s && "function" == typeof De.vars.onLockAxis && De.vars.onLockAxis.call(De, De.pointerEvent)), "y" === s ? n = 0 : "x" === s && (o = 0)), r = x + o * l, i = y + n * l), oe || ne ? (oe && (r = oe(r)), ne && (i = ne(i))) : w && (r > D ? r = D + (r - D) * d : k > r && (r = k + (r - k) * d), we || (i > O ? i = O + (i - O) * d : W > i && (i = W + (i - W) * d))), we || (r = Math.round(r), i = Math.round(i)), (De.x !== r || De.y !== i && !we) && (we ? De.endRotation = De.x = De.endX = r : (Ne && (De.y = De.endY = i), Se && (De.x = De.endX = r)), ee = !0, De.isDragging || (De.isDragging = !0, ae(De, "dragstart", "onDragStart")))
                        },
                        it = function(e, t) {
                            if (s && De.isPressed && (!e || null == K || t || !(e.pointerId && e.pointerId !== K || e.changedTouches && !Be(e.changedTouches, K)))) {
                                De.isPressed = !1;
                                var o, r, i, l, c = e,
                                    f = De.isDragging;
                                if (le ? (Ye(le, "touchend", it), Ye(le, "touchmove", nt), Ye(le, "touchcancel", it), Ye(m, "touchstart", Re)) : Ye(m, "mousemove", nt), Ye(m, "mouseup", it), e && e.target && Ye(e.target, "mouseup", it), ee = !1, M.parentNode && M.parentNode.removeChild(M), re) return e && Ye(e.target, "change", it), Ae(Pe, !1), ae(De, "release", "onRelease"), ae(De, "click", "onClick"), void(re = !1);
                                if (F(ze), !we)
                                    for (r = Pe.length; --r > -1;) J(Pe[r], "cursor", a.cursor || "move");
                                if (f && (Fe = B = C(), De.isDragging = !1), X--, e) {
                                    if (N && (e = j(e, !1)), o = e.changedTouches, o && (e = o[0], e !== G && e.identifier !== K)) {
                                        for (r = o.length; --r > -1 && (e = o[r]).identifier !== K;);
                                        if (0 > r) return
                                    }
                                    De.pointerEvent = c, De.pointerX = e.pageX, De.pointerY = e.pageY
                                }
                                return c && !f ? (fe && (a.snap || a.bounds) && qe(a.throwProps), ae(De, "release", "onRelease"), Y && "touchmove" === c.type || (ae(De, "click", "onClick"), l = c.target || c.srcElement || n, l.click ? l.click() : m.createEvent && (i = m.createEvent("MouseEvents"), i.initEvent("click", !0, !0), l.dispatchEvent(i)), de = C())) : (qe(a.throwProps), N || De.allowEventDefault || !c || !a.dragClickables && Ge.call(De, c.target) || !f || ge && (!xe || ge !== xe) || c.cancelable === !1 || (c.preventDefault(), c.preventManipulation && c.preventManipulation()), ae(De, "release", "onRelease")), f && ae(De, "dragend", "onDragEnd"), !0
                            }
                        },
                        at = function(e) {
                            if (e && De.isDragging) {
                                var t = e.target || e.srcElement || n.parentNode,
                                    o = t.scrollLeft - t._gsScrollX,
                                    r = t.scrollTop - t._gsScrollY;
                                (o || r) && (c -= o, f -= r, t._gsScrollX += o, t._gsScrollY += r, rt(De.pointerX, De.pointerY))
                            }
                        },
                        st = function(e) {
                            var t = C(),
                                o = 40 > t - de,
                                n = 40 > t - Fe;
                            (De.isPressed || n || o) && (e.preventDefault ? (e.preventDefault(), (o || n && De.vars.suppressClickOnDrag !== !1) && e.stopImmediatePropagation()) : e.returnValue = !1, e.preventManipulation && e.preventManipulation())
                        };
                    te = Ve.get(this.target), te && te.kill(), this.startDrag = function(e) {
                        ot(e), De.isDragging || (De.isDragging = !0, ae(De, "dragstart", "onDragStart"))
                    }, this.drag = nt, this.endDrag = function(e) {
                        it(e, !0)
                    }, this.timeSinceDrag = function() {
                        return De.isDragging ? 0 : (C() - Fe) / 1e3
                    }, this.hitTest = function(e, t) {
                        return Ve.hitTest(De.target, e, t)
                    }, this.getDirection = function(e, t) {
                        var o, n, r, a, s, l, c = "velocity" === e && i ? e : "object" != typeof e || we ? "start" : "element";
                        return "element" === c && (s = Ue(De.target), l = Ue(e)), o = "start" === c ? De.x - x : "velocity" === c ? i.getVelocity(this.target, be) : s.left + s.width / 2 - (l.left + l.width / 2), we ? 0 > o ? "counter-clockwise" : "clockwise" : (t = t || 2, n = "start" === c ? De.y - y : "velocity" === c ? i.getVelocity(this.target, Te) : s.top + s.height / 2 - (l.top + l.height / 2), r = Math.abs(o / n), a = 1 / t > r ? "" : 0 > o ? "left" : "right", t > r && ("" !== a && (a += "-"), a += 0 > n ? "up" : "down"), a)
                    }, this.applyBounds = function(e) {
                        var t, o;
                        return e && a.bounds !== e ? (a.bounds = e, De.update(!0)) : ($e(!0), Ke(), w && (t = De.x, o = De.y, w && (t > D ? t = D : k > t && (t = k), o > O ? o = O : W > o && (o = W)), (De.x !== t || De.y !== o) && (De.x = De.endX = t, we ? De.endRotation = t : De.y = De.endY = o, ee = !0, ze())), De)
                    }, this.update = function(e, t) {
                        var o = De.x,
                            n = De.y;
                        return Qe(), e ? De.applyBounds() : (ee && t && ze(), $e(!0)), De.isPressed && (Se && Math.abs(o - De.x) > .01 || Ne && Math.abs(n - De.y) > .01 && !we) && Je(), De
                    }, this.enable = function(e) {
                        var r, c, f;
                        if ("soft" !== e) {
                            for (c = Pe.length; --c > -1;) f = Pe[c], Xe(f, "mousedown", ot), Xe(f, "touchstart", ot), Xe(f, "click", st, !0), we || J(f, "cursor", a.cursor || "move"), J(f, "touchCallout", "none"), J(f, "touchAction", Se === Ne || l ? "none" : Se ? "pan-y" : "pan-x");
                            Ae(Pe, !1)
                        }
                        return z(De.target, at), s = !0, i && "soft" !== e && i.track(l || n, ye ? "x,y" : we ? "rotation" : "top,left"), l && l.enable(), n._gsDragID = r = "d" + _++, P[r] = this, l && (l.element._gsDragID = r), t.set(n, {
                            x: "+=0",
                            overwrite: !1
                        }), ue = {
                            t: n,
                            data: N ? I : n._gsTransform,
                            tween: {},
                            setRatio: N ? function() {
                                t.set(n, H)
                            } : o._internals.setTransformRatio || o._internals.set3DTransformRatio
                        }, De.update(!0), De
                    }, this.disable = function(e) {
                        var t, o, r = De.isDragging;
                        if (!we)
                            for (t = Pe.length; --t > -1;) J(Pe[t], "cursor", null);
                        if ("soft" !== e) {
                            for (t = Pe.length; --t > -1;) o = Pe[t], J(o, "touchCallout", null), J(o, "touchAction", null), Ye(o, "mousedown", ot), Ye(o, "touchstart", ot), Ye(o, "click", st);
                            Ae(Pe, !0), le && (Ye(le, "touchcancel", it), Ye(le, "touchend", it), Ye(le, "touchmove", nt)), Ye(m, "mouseup", it), Ye(m, "mousemove", nt)
                        }
                        return U(n, at), s = !1, i && "soft" !== e && i.untrack(l || n, ye ? "x,y" : we ? "rotation" : "top,left"), l && l.disable(), F(ze), De.isDragging = De.isPressed = re = !1, r && ae(De, "dragend", "onDragEnd"), De
                    }, this.enabled = function(e, t) {
                        return arguments.length ? e ? De.enable(t) : De.disable(t) : s
                    }, this.kill = function() {
                        return De.isThrowing = !1, t.killTweensOf(l || n, !0, Oe), De.disable(), delete P[n._gsDragID], De
                    }, -1 !== ve.indexOf("scroll") && (l = this.scrollProxy = new He(n, V({
                        onKill: function() {
                            De.isPressed && it(null)
                        }
                    }, a)), n.style.overflowY = Ne && !_e ? "auto" : "hidden", n.style.overflowX = Se && !_e ? "auto" : "hidden", n = l.content), a.force3D !== !1 && t.set(n, {
                        force3D: !0
                    }), we ? Oe.rotation = 1 : (Se && (Oe[be] = 1), Ne && (Oe[Te] = 1)), we ? (H = u, I = H.css, H.overwrite = !1) : ye && (H = Se && Ne ? d : Se ? p : h, I = H.css, H.overwrite = !1), this.enable()
                },
                Ie = Ve.prototype = new e;
            Ie.constructor = Ve, Ie.pointerX = Ie.pointerY = 0, Ie.isDragging = Ie.isPressed = !1, Ve.version = "0.14.1", Ve.zIndex = 1e3, Xe(m, "touchcancel", function() {}), Xe(m, "contextmenu", function() {
                var e;
                for (e in P) P[e].isPressed && P[e].endDrag()
            }), Ve.create = function(e, o) {
                "string" == typeof e && (e = t.selector(e));
                for (var n = e && 0 !== e.length ? De(e) ? Pe(e) : [e] : [], r = n.length; --r > -1;) n[r] = new Ve(n[r], o);
                return n
            }, Ve.get = function(e) {
                return P[(q(e) || {})._gsDragID]
            }, Ve.timeSinceDrag = function() {
                return (C() - B) / 1e3
            };
            var Ge = {},
                ze = function(e) {
                    var t = 0,
                        o = 0,
                        n = e.offsetWidth,
                        r = e.offsetHeight;
                    for (e = q(e); e;) t += e.offsetTop, o += e.offsetLeft, e = e.offsetParent;
                    return {
                        top: t,
                        left: o,
                        width: n,
                        height: r
                    }
                },
                Ue = function(e, t) {
                    if (e === window) return Ge.left = Ge.top = 0, Ge.width = Ge.right = v.clientWidth || e.innerWidth || m.body.clientWidth || 0, Ge.height = Ge.bottom = (e.innerHeight || 0) - 20 < v.clientHeight ? v.clientHeight : e.innerHeight || m.body.clientHeight || 0, Ge;
                    var o = e.pageX !== t ? {
                        left: e.pageX - G(),
                        top: e.pageY - I(),
                        right: e.pageX - G() + 1,
                        bottom: e.pageY - I() + 1
                    } : e.nodeType || e.left === t || e.top === t ? N ? ze(e) : q(e).getBoundingClientRect() : e;
                    return o.right === t && o.width !== t ? (o.right = o.left + o.width, o.bottom = o.top + o.height) : o.width === t && (o = {
                        width: o.right - o.left,
                        height: o.bottom - o.top,
                        right: o.right,
                        left: o.left,
                        bottom: o.bottom,
                        top: o.top
                    }), o
                };
            return Ve.hitTest = function(e, t, o) {
                if (e === t) return !1;
                var n, r, i, a = Ue(e),
                    s = Ue(t),
                    l = s.left > a.right || s.right < a.left || s.top > a.bottom || s.bottom < a.top;
                return l || !o ? !l : (i = -1 !== (o + "").indexOf("%"), o = parseFloat(o) || 0, n = {
                    left: Math.max(a.left, s.left),
                    top: Math.max(a.top, s.top)
                }, n.width = Math.min(a.right, s.right) - n.left, n.height = Math.min(a.bottom, s.bottom) - n.top, 0 > n.width || 0 > n.height ? !1 : i ? (o *= .01, r = n.width * n.height, r >= a.width * a.height * o || r >= s.width * s.height * o) : n.width > o && n.height > o)
            }, M.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;", Ve
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), require("../plugins/CSSPlugin.js"), module.exports = t())
    }("Draggable");