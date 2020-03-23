import * as JSX from '../parts/jsx-helpers.js';
const h = JSX.h;

//#region Markup
const Markup = () => (h`
	<label class="switch">
		<input type="checkbox" />
		<span class="slider"></span>
	</label>
`);
//#endregion

//#region Style
const Style = (`
	.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
	}

	.switch input { 
	opacity: 0;
	width: 0;
	height: 0;
	}

	.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	border-radius: 34px;
	right: 0;
	bottom: 0;
	background-color: var(--accent);
	-webkit-transition: .4s;
	transition: .4s;
	}

	.slider:before {
	position: absolute;
	content: "";
	height: 26px;
	width: 26px;
	border-radius: 50%;
	left: 4px;
	bottom: 4px;
	background-color: var(--background-accent);
	-webkit-transition: .4s;
	transition: .4s;
	}

	input:checked + .slider {
	background-color: #2196F3;
	}

	input:focus + .slider {
	box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
	}
`);
//#endregion

//#region Logic
const Logic = class extends HTMLElement {
	static get observedAttributes() { return ["checked"]; }
	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "checked": 
				this.checked = newValue.trim().toLowerCase() == "true" ?
					true : false;
				break;
		}
	}

	get innerInput() { return this.querySelector("input"); }
	get checked() { return this.innerInput.checked; }
	set checked(newValue) { this.innerInput.checked = true; }

	constructor() {
		super();
		JSX.render(Markup(), this);
	}

	static define() {
		JSX.addComponentStyles(Style);
		customElements.define("toggle-switch", this);
	}
};
//#endregion

export default Logic;