import * as JSX from '../parts/jsx-helpers.js';
const h = JSX.h;

//#region Markup
const Markup = () => (h`
	<header className="d-flex">
		<img id="logo" />
		<div id="header-text" className="flex-1 d-flex flex-direction-column">
			<h1 className="mono flex-1"></h1>
			<h4 className="flex-1"></h4>
			<i class="fas fa-home" link-to="#"></i>
		</div>
	</header>
`);
//#endregion

//#region Style
const Style = (`
	title-header #logo {
		width: 7.5rem; height: 7.5rem;
		margin: 0.5rem;
	}

	title-header { width: 100%; }

	title-header header { padding: 1.5rem 0.5rem; }

	title-header header h1 { margin: 0; }

	title-header #header-text { margin: 0.5rem; }

	title-header header h1.mono { position: relative; top: 0.75rem; }

	title-header i {
		font-size: 2rem;
		position: fixed;
		z-index: 420;
		right: 1em;
		top: 1em;
	}
`);
//#endregion

//#region Logic
const Logic = class extends HTMLElement {
	static get observedAttributes() { return ["data-title", "data-subtitle", "data-picture"]; }
	attributeChangedCallback(name, oldVal, newVal) {
		switch (name) {
			case "data-title":
				this.querySelector("h1").innerText = newVal; break;
			case "data-subtitle":
				this.querySelector("h4").innerText = newVal; break;
			case "data-picture":
				this.querySelector("#logo").src = newVal; break;
		}
	}

	constructor() {
		super();
		JSX.render(Markup(this.dataset), this);
	}

	static define() {
		JSX.addComponentStyles(Style);
		customElements.define("title-header", this);
	}
};
//#endregion

export default Logic;