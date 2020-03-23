export class Router {
	constructor(state) {
		this.globalState = state;
		this.currentPage = null;
		window.addEventListener("hashchange", this.onRedirect.bind(this));
		this.onRedirect();
	}

	onRedirect() {
		const newHash = window.location.hash;

		// Parse New URL
		let parsedHash = newHash.replace("#", "").startsWith("/") ? 
			newHash.replace("#", "") : `/${newHash.replace("#", "")}`;
		if (parsedHash.trim() == "") parsedHash = "/";
		console.log(parsedHash);

		if (this.currentPage) {
			// Hide old page:
			this.currentView.hidePage((() => {
				// Set new page:
				this.currentPage = parsedHash;
				this.currentView.showPage();
				this.globalState.headerSubtitle = this.currentView.getAttribute("description"); // Change display text.
			}).bind(this));
		}

		else {
			// Set new page:
			this.currentPage = parsedHash;
			this.currentView.showPage();
			this.globalState.headerSubtitle = this.currentView.getAttribute("description"); // Change display text.
		}
	}

	get currentView() {
		return (
			document.querySelector(`spa-view[identifier='${this.currentPage}']`) ||
			document.querySelector(`spa-view[identifier='404']`)
		);
	}
}
