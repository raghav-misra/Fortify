import { h } from '../parts/jsx-helpers.js';

const Page = (h`
	<spa-view identifier="/apps/factbook" description="COVID-19 Factbook (from CDC)" data-display="flex" className="flex-direction-column">
		<div className="tile-container flex-1 d-flex justify-content-center" style="flex-wrap: wrap">
			<div className="tile-group">
				<div className="tile w-xlarge h-large">
					<h4 className="mono text-center">What is COVID-19?</h4>
					<hr />
					<p className="lead">
						Coronavirus disease 2019 (COVID-19) is a respiratory illness 
						that can spread from person to person. The virus that causes COVID-19 
						is a novel (new) coronavirus that was first identified during an 
						investigation into an outbreak in Wuhan, China.
					</p>
				</div>
				<br />
				<div className="tile w-xlarge h-xlarge">
					<h4 className="mono text-center">How does it spread?</h4>
					<hr />
					<p className="lead">
						The virus that causes COVID-19 probably emerged from an 
						animal source, but is now spreading from person to person. 
						The virus is thought to spread mainly between people who are in close contact 
						with one another (within about 6 feet) through respiratory droplets produced 
						when an infected person coughs or sneezes. It also may be possible that 
						a person can get COVID-19 by touching a surface or object that has the 
						virus on it and then touching their own mouth, nose, or possibly 
						their eyes, but this is not thought to be the 
						main way the virus spreads.
					</p>
				</div>
			</div>
			<div className="tile-group">
				<div className="tile w-xlarge h-mega">
					<h4 className="text-center mono">How can you protect yourself and others?</h4>
					<hr />
					<p class="lead">
						People can help protect themselves from respiratory illness with everyday preventive actions.
						<br/><br/>
						- Avoid any contact with people who are sick.
						<br /><br />
						- Avoid touching your eyes, nose, and mouth with unwashed hands.
						<br /><br />
						- Wash your hands often with soap and water for at least 20 seconds.
						<br /><br />	
						- Use an alcohol-based hand sanitizer that contains at least 60% 
							alcohol if soap and water are not available.
					</p>
				</div>
			</div>
			<div className="tile-group">
				<div className="tile w-xlarge h-mega tile-accent" style="overflow:scroll;">
					<h4 className="text-center mono">COVID-19 News</h4>
          <a class="twitter-timeline" href="https://twitter.com/CDCgov?ref_src=twsrc%5Etfw">Tweets by CDCgov</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
				</div>
			</div>
		</div>
	</spa-view>
`);

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Factbook',
		text: 'Learn about COVID-19 and it\'s dangers, along with info on how to protect yourself. Includes a live news feed via the CDC.',
		footer: '<span>Stay Protected.</span>' 
	});
});


export default Page;