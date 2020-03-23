import { h, addComponentStyles } from '../parts/jsx-helpers.js';
import Voo from '../parts/voo.js';
import anime from '../parts/anime.js';

const washReasons = [
	"Preparing Food", "Before Eating", "After Eating",
	"Coughing or Sneezing", "Blowing Your Nose", "Feeling Sick",
	"Contact with Animals", "Touched Waste", "Contact w/Someone Sick",
	"Used the Bathroom", "Treating a cut/wound", "Caring For Someone Sick",
	"You love washing hands!", "You were bored.", "Other"
];

const WashLog = h`<wash-log></wash-log>`;

window.Popup = (h`
	<section id="when-washed-popup">
		<div class="text-center" style="padding: 1rem;">
			<h1>Why did you wash your hands?</h1>
			<hr />
			<div className="tile-container" id="choiceRegion" hidden>
				${ washReasons.map(reason => h`
				<div className="tile" onClick=${moveToCheckStage}>
					<h5>${reason}</h5>
				</div>
				`)}
			</div>
			<section className="text-left" id="checkRegion" hidden>
				<h4 className="toggle-group">
					<input type="checkbox" 
						style="margin: 1rem; position: relative; bottom: 0.25rem" 
					/>
					<label style="all: inherit; display: inline;">
						Did you use soap or an 
						alcohol-based rub?
					</label>
				</h4>
				<h4 className="toggle-group">
					<input type="checkbox" 
						style="margin: 1rem; position: relative; bottom: 0.25rem" 
					/>
					<label style="all: inherit; display: inline;">
						Did you wash for 20+ seconds?
					</label>
				</h4>
				<hr spacer />
				<button class="tile loose">
					<h4>Add to Log</h4>
				</button>	
				<button class="tile loose" onClick=${cancelReset}>
					<h4>Nevermind</h4>
				</button>	
			</section>
		</div>
	</section>
`);

//#region Main Page:
const Page = (h`
	<spa-view identifier="/apps/wash-counter" description="Wash Counter"
		className="align-items-center justify-content-center flex-direction-column"
		data-display="flex">
		<br /><br />
		<h1>Score: <span className="h1" v-bind="innerText :: safetyScore"></span>%</h1>
		<hr spacer />
		<div className="cirque c-large" onClick=${showChoicePopup}>
			<div className="cirque c-med">
				<div className="cirque c-small">
					<h3 className="mono color-accent text-center">
						I Washed My Hands!
					</h3>
				</div>
			</div>
		</div>
		<hr spacer />
		${WashLog}
		${Popup}
	</spa-view>
`);
//#endregion

const choiceRegion = Popup.querySelector("#choiceRegion");
const checkRegion = Popup.querySelector("#checkRegion");
const finalSubmit = checkRegion.querySelector("button");

function getCurrentDateTime() {
	var today = new Date();
	const date = `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
	const time = `${today.getHours()}:${today.getMinutes()}`;
	return `${date} ${time}`;
}

function cancelReset() {
	checkRegion.querySelectorAll("input[type='checkbox']")
		.forEach(el => el.checked = false);

	// Hide Popup:
	Popup.style.animation = "fade-out 0.5s ease-out";
	setTimeout(() => {
		Popup.classList = "";
		document.body.style.overflow = "auto";
		anime({
			targets: ".c-large",
			scale: 1,
			duration: 2000
		});
		anime.timeline().add({
			targets: ".c-med",
			scale: 1,
			duration: 500,
			backgroundColor: "#2ecc71"
		}).add({
			targets: ".c-med",
			duration: 500,
			backgroundColor: "#6495EC"
		});
	}, 490);
}

function moveToCheckStage() {
	// Add wash to log:
	const target = this.querySelector("h5") || this;
	const reason = target.innerText;
	const formattedData = `Time: ${getCurrentDateTime()} | Reason: ${reason}`;
	WashLog.addEntry(formattedData);

	choiceRegion.hidden = true;
	checkRegion.hidden = false;

	finalSubmit.onclick = () => addToLog(formattedData);
}

function addToLog(reason) {
	window.globalState.safetyScore += 3;
	try {
		checkRegion.querySelectorAll("input[type='checkbox']")
		.forEach(el => 
			el.checked && window.globalState.safetyScore++);
		const newData = JSON.parse(localStorage.getItem("user"));
		newData.washEntries = newData.washEntries || [];
		newData.washEntries.push(reason);
		newData.safetyScore = window.globalState.safetyScore;
		localStorage.setItem("user", JSON.stringify(newData));
	} catch (e) { console.log(e) }

	cancelReset();
}

function showChoicePopup() {
	Popup.classList = "shown";
	checkRegion.hidden = true;
	choiceRegion.hidden = false;
	Popup.style.animation = "fade-in 0.5s ease-in";
	document.body.style.overflow = "hidden";
	anime({
		targets: ".c-large",
		scale: 0,
		duration: 2000
	});
	anime({
		targets: ".c-med",
		scale: 0,
		duration: 1000
	});
}

//#region Style:
addComponentStyles(`
	spa-view[identifier="/apps/wash-counter"] .cirque {
		border-radius: 50%;
		justify-content: center;
		display: inline-flex;
		align-items: center;
	}

	spa-view[identifier="/apps/wash-counter"] .cirque.c-large {
		width: 24rem;
		height: 24rem;
		background: white;
	}

	spa-view[identifier="/apps/wash-counter"] .cirque.c-med {
		width: 20rem;
		height: 20rem;
		background: var(--accent);
	}

	spa-view[identifier="/apps/wash-counter"] .cirque.c-small {
		width: 16rem;
		height: 16rem;
		background: var(--background-accent);
	}

	#when-washed-popup {
		position: fixed;
		top: 0;
		left: 0;
		display: none;
		bottom: 0;
		right: 0;
		z-index: 69;
		overflow-y: auto;
		animation: none;
		justify-content: center;
	}

	#when-washed-popup.shown {
		display: flex;
	}

	#when-washed-popup .tile-container {
		background: var(--background-accent);
		text-align: center;
	}

	#when-washed-popup .tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
`);
//#endregion

Page.addEventListener("whenConnected", () => {
	const newData = JSON.parse(localStorage.getItem("user"));
	newData.washEntries = newData.washEntries || [];
	customElements.whenDefined("wash-log").then(() => {
		newData.washEntries.forEach(reason => WashLog.addEntry(reason));
	});
	globalState.safetyScore = newData.safetyScore || 0;
	localStorage.setItem("user", JSON.stringify(newData));

});

Page.addEventListener("whenShown", () => {
	//DO CHECKBOX THING
	document.querySelector(".c-large").style.transform = "scale(0)";
	document.querySelector(".c-med").style.transform = "scale(0)";
	anime({
		targets: ".c-large",
		scale: 1,
		duration: 2000
	});
	anime({
		targets: ".c-med",
		scale: 1,
		duration: 1000
	});
});

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Wash Counter',
		text: 'Washing your hands is probably the most important method of COVID-19 protection. Keep track of that with Fortify. As an incentive to stay safe, you can earn between 3-5 points when you wash your hands.',
		footer: '<i>*scrub scrub wash wash*</i>' 
	});
});


export default Page;