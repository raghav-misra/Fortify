import { h } from '../parts/jsx-helpers.js';
import Voo from '../parts/voo.js';

let calendar;
let events = [];
try {
	events = JSON.parse(window.localStorage.getItem("user")).events;
} catch (e) {/* bruh */ }
function newEvent() {
	let event = {}
	Swal.mixin({
		input: 'text',
		confirmButtonText: 'Next &rarr;',
		showCancelButton: true,
		progressSteps: ['1', '2', '3']
	}).queue([
		{
			title: 'Event Title',
			text: 'Name of the event'
		},
		{
			title: 'Start Date',
			text: 'Example: 2020-01-01'
		},
		{
			title: 'End Date',
			text: 'Example: 2020-01-01'
		}
	]).then((result) => {
		if (result.value) {
			let newEvents = JSON.parse(window.localStorage.getItem("user"))
			const answers = JSON.stringify(result.value)
			event.title = result.value[0]
			event.start = result.value[1]
			event.end = result.value[2]
			console.log("arry legth")
			console.log(newEvents.events.length)
			event.id = result.value[0]


			calendar.addEvent(event)
			calendar.render()

			newEvents.events.push(event)
			window.localStorage.setItem("user", JSON.stringify(newEvents))
			Swal.fire({
				title: 'Event Added!',
				confirmButtonText: 'Continue'
			})
		}
	})


}

async function deleteEvent() {
	let events = JSON.parse(window.localStorage.getItem("user")).events
	let options = {}
	let pos = {}
	events.forEach(function(event, i) {
		options[event.title] = event.title
		pos[event.title] = i
	})

Swal.fire({
		title: 'Delete an event',
		input: 'select',
		inputOptions: options,
		inputPlaceholder: 'Select an event to delete',
		showCancelButton: true,
		inputValidator: (value) => {
			return new Promise((resolve) => {
				events.splice(pos[value], 1)
				let user = JSON.parse(window.localStorage.getItem('user'))
				user.events = events
				window.localStorage.setItem('user', JSON.stringify(user))
				console.log(pos[value])
				let eventObj = calendar.getEventById(value)
				console.log(eventObj)
				eventObj.remove()
				resolve()
				calendar.render()
			})
		}
	})


}

const Page = (h`
	<spa-view identifier="/apps/scheduler" description="Scheduler">
   		<button class="tile loose" onclick=${newEvent} id="addEvent">Add Event</button>
       	<button class="tile loose" onclick=${deleteEvent} id="deleteEvent">Delete Event</button>
		<div id="calendarEl"></div>
	</spa-view>
`);


Page.addEventListener("whenShown", () => {
	calendar.render();
});

Page.addEventListener("whenHidden", () => {

});

Page.addEventListener("whenConnected", () => {
	var calendarEl = document.getElementById('calendarEl');

	calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'dayGrid'],
		timeZone: 'UTC',
		defaultView: 'dayGridWeek',
		header: {
			left: 'prev,next',
			center: 'title',
			right: 'dayGridDay,dayGridWeek'
		},
		editable: true,
		events: events
	});

	calendar.render();

});

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Scheduler',
		text: 'Managing your time is very important regardless of the COVID-19 outbreak. ',
		footer: 'Hooray! 3 cheers for time management!' 
	});
});

export default Page;