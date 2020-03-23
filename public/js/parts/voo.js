function useState(initialState) {
	// Storage inaccessible outside function:
	let internalValue = initialState;

	// Store bindings:
	const dataList = [];

	return {
		/* Getter & Setter for internal value */
		get value() {
			return internalValue;
		},

		set value(newState) {
			internalValue = newState;

			dataList.forEach(({ element, property }) => {
				if (property.startsWith("#")) element.setAttribute(property.replace("#", ""), internalValue);
				else element[property] = internalValue;
			})
		},

		/* Attach Targets */
		attach(element, property) {
			dataList.push({ element, property });

			if (property.startsWith("#")) element.setAttribute(property.replace("#", ""), internalValue);
			else element[property] = internalValue;
		}
	};
};

export function bind(target, staticData, searchAttribute = "v-bind") {
	const targetEl = typeof target == "string" ? 
		document.querySelector(target) :
		target;
	// Convert static values to stateful bindings:
	const stateObject = Object.create(null);
	Object.keys(staticData).forEach((k) => {
		if (staticData.hasOwnProperty(k)) stateObject[k] = useState(staticData[k]);
	});

	// Loop thru descendants with searchAttribute:
	targetEl.querySelectorAll(`[${searchAttribute}]`).forEach((element) => {
		// Bindings as a string array:
		const bindings = element.getAttribute(searchAttribute).trim().split("&&");

		// Loop thru & parse bindings:
		bindings.forEach((bindString) => {
			// Split string & commence parsing:
			const [property, stateRef] = bindString.split("::").map((s) => s.trim());

			// Attach element:property pair to binding:
			stateObject[stateRef].attach(element, property);
		});

		element.removeAttribute(searchAttribute);
	});

	// Generate accessor (get/set) methods for each state hook:
	const stateAccessor = Object.create(null);
	Object.keys(stateObject).forEach((k) => {
		Object.defineProperty(stateAccessor, k, {
			get() { return stateObject[k].value; },
			set(newState) { stateObject[k].value = newState; }
		});
	});
	Object.freeze(stateAccessor);
	Object.seal(stateAccessor);
	return stateAccessor;
}

export default { bind };