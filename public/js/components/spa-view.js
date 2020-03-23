import * as JSX from '../parts/jsx-helpers.js';

//#region Style
const Style = (`
	spa-view[identifier] {
		flex: 1;
		display: none;
	}
`);
//#endregion

//#region Logic
const events = { 
	whenShown: new Event("whenShown"), 
	whenHidden: new Event("whenHidden"),
	whenConnected: new Event("whenConnected"),
	firstTime: new Event("firstTime")
}
const Logic = class extends HTMLElement {
	connectedCallback() {
		this.dispatchEvent(events.whenConnected);
	}

	showPage(animationCallback=null) {
		this.style.display = this.dataset.display || "block";
		this.dispatchEvent(events.whenShown);
		this.style.animation = "fade-in 0.5s ease-in";
		this.style.animationFillMode="both"
			setTimeout(animationCallback, 450);
		let user = JSON.parse(localStorage.getItem("user"));
		if (user && user.shownAgain.indexOf(this.getAttribute("identifier")) == -1) {
			this.dispatchEvent(events.firstTime);
			user.shownAgain.push(this.getAttribute("identifier"));
			window.globalState.shownAgain.push(this.getAttribute("identifier"));
			localStorage.setItem("user", JSON.stringify(user));
		}
	}

	hidePage(animationCallback=null) {
		this.style.animation = "fade-out 0.5s ease-out";
     this.style.animationFillMode="both"
		setTimeout((() => {
			this.style.display = "none";
			this.dispatchEvent(events.whenHidden);
			animationCallback();
		}).bind(this), 450);
	}

	static define() {
		JSX.addComponentStyles(Style);
		customElements.define("spa-view", this);
	}
};
//#endregion

export default Logic;