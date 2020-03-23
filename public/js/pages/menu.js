import { h, addComponentStyles } from '../parts/jsx-helpers.js';

const links = [
	["Dashboard", "#"], ["Factbook", "#/apps/factbook"], 
	["Wash Counter", "#/apps/wash-counter"], ["Scheduler", "#/apps/scheduler"],
	["CoinAGES", "#/apps/coinages"], ["Activities", "#apps/activities"],
	["Settings", "#/settings"]
];

const Page = (h`
	<spa-view identifier="/menu" description="All Apps & Tools" data-display="flex" className="flex-direction-column">
		<div className="text-center flex-1 tile-group">
			${ links.map((data, i) => {
				let style = "defo";
				if ((i+1) % 3 == 0) style = "accent";
				else if ((i+2) % 3 == 0) style = "light";
				return h`
					<div link-to=${data[1]}
						className=${`tile w-large tile-${style}`}>
						<h5>${data[0]}</h5>
					</div>`;
			}) }
		</div>
	</spa-view>
`);

addComponentStyles(`
	spa-view[identifier="/menu"] .tile {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
`);

export default Page;