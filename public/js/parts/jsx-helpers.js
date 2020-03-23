//#region Packaged version of developit/HTM for lit JSX
export const htm = (function() {
	var n = function (t, s, r, e) {var u;s[0] = 0;for (var h = 1; h < s.length; h++) {var p = s[h++],a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);}return e;},t = new Map();const returnValue =  function (s) {var r = t.get(this);return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function (n) {for (var t, s, r = 1, e = "", u = "", h = [0], p = function (n) {1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";}, a = 0; a < n.length; a++) {a && (1 === r && p(), p(a));for (var l = 0; l < n[a].length; l++) t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : '"' === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);}return p(), h;}(s)), r), arguments, [])).length > 1 ? r : r[0];}
	return returnValue;
})();
//#endregion

//#region JSX helper for creating HTMLElements
export function createElement(tagName, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    // Make sure all parameters are defined.
    props = props || {};
    // If tag is a function, call it with props and children.
    if ((typeof tagName) === "function") {
        return tagName(props, children);
    }
    // Otherwise (tag is a string) generate DOM node.
    var element = document.createElement(tagName);
    // Add all properties to the new element.
    Object.keys(props).forEach(function (name) {
        if (props.hasOwnProperty(name))
            setProperty(element, name, props[name]);
    });
    // Add all children to the new element.
    render(children, element);
    // Return the element.
    return element;
}

// createElement bound to htm (tagged template JSX)
export const h = htm.bind(createElement);
//#endregion

//#region Render DocumentFragment with JSX:
export function Fragment(ignoreProps) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var fragment = document.createDocumentFragment();
    children.forEach(function (child) { return render(child, fragment); });
    return fragment;
}
//#endregion

//#region Add scoped component styles
var componentStylesheet = document.querySelector("#componentStyles");
export function addComponentStyles(styleString) {
    componentStylesheet.innerText += styleString
        .trim().replace(/\t/g, "").replace(/\n/g, "");
}
//#endregion

//#region Render function implementation for Nodes, Arrays, and strings
export function render(child, parent) {
    if (Array.isArray(child)) {
        child.forEach(function (el) { return render(el, parent); });
    }
    else if (!child)
        return; // Child is falsy.
    // Check if child is a string:
    else if (typeof child === "string")
        parent.appendChild(document.createTextNode(child));
    // Otherwise assume it is a Node:
    else
        parent.appendChild(child);
}
//#endregion

//#region setAttribute with support for event handlers:
function setProperty(element, name, value) {
    var validProps = ["innerText", "value", "disabled", "classList"];
    var caselessName = name.toLowerCase().trim();
    var trimmedName = name.trim();
    // className becomes class:
    if (caselessName == "classname") {
        element.setAttribute("class", value);
    }
    // Event listeners as functions:
    else if (caselessName.startsWith("on") && typeof value == "function") {
        element.addEventListener(caselessName.replace("on", ""), value);
    }
    // Property > Attributes:
    else if (validProps.indexOf(trimmedName) != -1) {
        element[trimmedName] = value;
    }
    // Apply as HTML attribute:
    else {
        element.setAttribute(name, value);
    }
}
//#endregion