import { h } from '../parts/jsx-helpers.js';

const Page = (h`
	<spa-view identifier="/" data-display="flex" description="Dashboard" className="width-full">
		<div id="dashboard" className="flex-1 d-flex">
			<div className="d-flex text-center flex-direction-column justify-content-center align-items-center" id="dashboardPanelLeft" style="flex: 1">
				<safety-score className="text-center" 
					v-bind="#data-percent :: safetyScore"
				></safety-score>
				<div class="tile tile-light loose">
					<h5>
						Let's get to 100% today!
					</h5>
				</div>
			</div>

			<hr spacer className="d-none"/>

			<div className="d-flex text-center tile-container justify-content-center align-items-center" id="dashboardPanelRight" style="flex: 1.5">
				<div className="tile-group">
					<div className="tile tile-dashboard w-large"
						link-to="#/apps/wash-counter">
						<i class="fas fa-bath"></i>
						<h5>Wash Counter</h5>
					</div><br/>
					<div className="tile tile-dashboard w-large h-large"
						link-to="#/apps/factbook">
						<i class="fas fa-info"></i>
						<h5>Factbook</h5>
					</div>
				</div>
				<div className="tile-group">
					<div className="tile tile-dashboard w-large h-large"
						link-to="#/apps/activities">
						<i class="fas fa-running"></i>
						<h5>Activities</h5>
					</div><br/>
					<div className="tile tile-dashboard tile-accent w-large" 
						link-to="#/menu">
						<i class="fas fa-th align-self-center"></i>
						<h5>All Tools</h5>	
					</div>
				</div>
			</div>
		</div>
	</spa-view>
`);

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Fortify Dashboard',
		text: 'The home of your Fortify experience, view your safety score and visit other Fortify apps.',
		footer: '<span>Let\'s keep ourselves protected, the fun way!' 
	});
});

export default Page;