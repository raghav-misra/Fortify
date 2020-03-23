import * as JSX from '../parts/jsx-helpers.js';
const h = JSX.h;

//#region Markup
const Markup = () => (h`
	<details>
		<summary>
			<h5 className="d-inline-block">Wash Log</h5>
		</summary>
		<hr />
		<div class="log-container">
		</div>
	</details>
`);
//#endregion

//#region Style
const Style = (`
	wash-log {
		width: 100%;
	}

	wash-log .log-container > p {
		margin: 0.5rem;
	}
`);
//#endregion


//#region Logic
const Logic = class extends HTMLElement {3
	constructor() {
		super();
		JSX.render(Markup(), this);
	}

	static define() {
		JSX.addComponentStyles(Style);
		customElements.define("wash-log", this);
	}

	addEntry(data) {
		this.querySelector(".log-container").appendChild(h`
			<p className="lead mono">${data}</p>
		`);
	}
};
//#endregion

export default Logic;