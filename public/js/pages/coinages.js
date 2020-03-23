import { h, addComponentStyles } from '../parts/jsx-helpers.js';

//#region Main Page:
const Page = (h`
	<spa-view identifier="/apps/coinages" id="coinages"
		description="Pass the time, play CoinAGES">
		<iframe src="https://coinages.obliviontech.dev">
		</iframe>
	</spa-view>
`);
//#endregion

//#region Style:
addComponentStyles(`
	#coinages iframe {
		position: fixed;
		width: 100%;
		border: none;
		top: 0; left: 0;
		right: 0; bottom: 0;
		height: 100%;
		z-index: 69;
	}
`);
//#endregion

Page.addEventListener("whenShown", () => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	});

	Toast.fire({
		icon: 'success',
		title: 'Play CoinAGES to pass time being quarantined!'
	})
});

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'CoinAGES',
		text: 'From the creators of Fortify, a game designed to help you pass time, especially during the COVID-19 outbreak.',
		footer: '<span>Play now!</span>' 
	});
});



export default Page;