import { h } from '../parts/jsx-helpers.js';

const Page = (h`
	<spa-view identifier="404" description="Missing Page">
		<section className="text-center">
			<br/>
			<h1 style="font-size: 4rem;" className="mono color-accent">404</h1>
			<br/>
			<hr /><br />
			<h3>Seems you've hit a dead end. ¯\\_(ツ)_/¯</h3>
			<br />
			<h6 class="color-accent">Redirecting home in a moment...</h6>
			<br />
		</section>
	</spa-view>
`);

Page.addEventListener("whenShown", () => {
	// Redirect to dashboard
	setTimeout(() => location.href = "#", 2000);
});

export default Page;