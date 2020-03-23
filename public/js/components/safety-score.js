import * as JSX from '../parts/jsx-helpers.js';

//#region Style
const Style = (`
	safety-score {
		height: 20rem;
		display: block;
		position: relative;
		margin-top: 2rem;
	}

	safety-score svg {
		width: 17.5rem;
		height: 17.5rem;
	}

	safety-score .progressbar-text {
		color: var(--accent); 
		position: absolute;
		padding: 0px; margin: 0px; 
		font-size: 3rem;
		top: 50%; left: 50%;
		font-family: "IBM Plex Mono";
		transform-origin: top left;
		transform: translateX(-50%) translateY(-75%);
	}

	@media only screen and (max-width: 1000px) {
		safety-score svg {
			width: 15rem;
			height: 15rem;
		}
		
		safety-score .progressbar-text {
			transform: translateX(-50%) translateY(-112.5%);
		}
	}
`);
//#endregion

//#region Logic
const Logic = class extends HTMLElement {
	static get observedAttributes() { return ["data-percent"] }
	attributeChangedCallback(name, oldVal, newVal) {
		switch (name) {
			case "data-percent":
				const percent = parseInt(newVal) > 100 ?
				100 : parseInt(newVal);
				let decimal = percent / 100;
				const change = Math.abs(parseInt(oldVal) - percent);
				this.internalElement.animate(decimal, { duration: change * 10 });
				this.internalElement.text.innerText = `${percent}%`;
				globalState.safetyScore > 100 && (globalState.safetyScore = 100);
		}
	}

	constructor() {
		super();
		this.dataset.percent = this.dataset.percent || "0";
		this.internalElement = new ProgressBar.Circle(this, {
			strokeWidth: 10,
			trailColor: 'var(--background-accent)', color: "var(--accent)",
			text: {
				value: `${this.percent || 0}%`,
				style: null
			}
		});

		this.internalElement.svg.style = "";
	}

	static define() {
		JSX.addComponentStyles(Style);
		customElements.define("safety-score", this);
	}
};
//#endregion

export default Logic;