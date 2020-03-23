// Anime:
import anime from './parts/anime.js';

// Load SPA pages:
import './parts/pages.js';

// Routing:
import { Router } from './parts/router.js';
new Router(window.globalState);

// Convert hrefs to click events:
document.querySelectorAll("[link-to]").forEach(el => {
	const redirectTo = el.getAttribute("link-to");
	el.style.cursor = "pointer";
	el.addEventListener("click", () => location.href = redirectTo);
});

// Check if it is a new user 
const popup = document.querySelector("#popup");
if (!window.localStorage.getItem("user")) {
	popup.style.display = "flex";
	popup.style.transform = "translateY(100%)";
	anime({
		targets: popup,
		translateY: 0,
		duration: 1000,
		easing: "easeInOutCubic"
	});
} else { // Restore userdata
	// Try Reset New Day:
	const storedData = JSON.parse(localStorage.getItem("user"));
	console.log(storedData);
	const currentDate = new Date().getDate();
	if (storedData && storedData.lastDay != currentDate) {
		localStorage.setItem("user", JSON.stringify({
			name: storedData.name,
			safetyScore: 0,
			washEntries: [],
			customActivities: storedData.customActivities || [],
			events: storedData.events || [],
			headerImage: storedData.headerImage || "/assets/pfp.png",
			shownAgain: storedData.shownAgain || []
		}));
	}
	const user = JSON.parse(localStorage.getItem("user"));
	window.globalState.safetyScore = user.safetyScore
	window.globalState.headerTitle = user.name
	window.globalState.headerImage = user.headerImage
	window.globalState.events = user.events
}
// Open new profile menu
document.getElementById("createNewUser").addEventListener("click", () => {
	anime({
		targets: document.getElementById("initial"),
		translateX: 700,
		easing: "easeInOutCubic",
		duration: 1000,
		opacity: 0
	});
	setTimeout(function() {
		document.getElementById("initial").style.display = "none"
		document.getElementById("createProfile").style.display = "block"
		anime({
			targets: document.getElementById("createProfile"),
			easing: "easeInOutCubic",
			duration: 1000,
			opacity: 1
		});
	}, 1100);
});
// Go back to main menu
document.getElementById("back").addEventListener("click", function() {
	anime({
		targets: document.getElementById("createProfile"),
		easing: "easeInOutCubic",
		duration: 1000,
		opacity: 0
	});
	setTimeout(function() {
		document.getElementById("createProfile").style.display = "none"
		document.getElementById("initial").style.display = "block"
		anime({
			targets: document.getElementById("initial"),
			translateX: 0,
			easing: "easeInOutCubic",
			duration: 1000,
			opacity: 1
		});
	}, 950);
});
// Create Profile
document.getElementById("submitProfile").addEventListener("click", function() {
	let name = document.getElementById("name").value.trim();
	if (name == "") alert('Please Type In Your Name')
	else { // Add to storage
		globalState.headerTitle = name;
		globalState.safetyScore = 0;
		globalState.events = []
		globalState.shownAgain = []
		globalState.headerImage = "https://source.unsplash.com/900x900/?" + document.getElementById("image").value
		window.localStorage.setItem("user", JSON.stringify({
			name,
			safetyScore: 0,
			headerImage: globalState.headerImage,
			events: [],
			customActivities: [],
			lastDay: new Date().getDate(),
			shownAgain: []
		}))
		document.getElementById("submitProfile").disabled = true
		anime({
			targets: popup,
			translateY: 700,
			duration: 1000,
			easing: "easeInOutCubic"
		});
		setTimeout(() => {
			popup.style.display = 'none';
			location.href = "/";
		}, 950);
	}
});

// Restore Profile
document.getElementById("restoreUser").addEventListener("click", () => {
	document.getElementById("restoreUser").disabled = true
	let code = document.getElementById("code").value
	fetch('/restore', {
		method: 'post', headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code: code })
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		if (data.success) {
			window.localStorage.setItem("user", JSON.stringify({
				...data.data,
				shownAgain: []
			}))
	   location.href="/";
		} else {
			document.getElementById("restoreUser").disabled = false
			document.getElementById("code").value = ""
			Swal.fire({
				icon: "error",
				title: "Unable to find that profile",
				text: "Did you use the right code?"
			})
		}
	});
});

