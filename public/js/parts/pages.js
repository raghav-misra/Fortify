// Setup one-way data flow:
import Voo from './voo.js';
window.globalState = {
	safetyScore: 0,
	headerTitle: "Welcome!",
	headerSubtitle: "Page Info",
	headerImage: "/assets/pfp.png",
  	events: [],
	shownAgain: []
};

// Initialize Components:
import TitleHeader from '../components/title-header.js';
TitleHeader.define();

import SafetyScore from '../components/safety-score.js';
SafetyScore.define();

import WashLog from '../components/wash-log.js';
WashLog.define();

import ToggleSwitch from '../components/toggle-switch.js';
ToggleSwitch.define();


// Initialize View: 
import SPAView from '../components/spa-view.js';
SPAView.define();

// Container:
const container = document.querySelector("#pages");

// Pages:
import Dashboard from '../pages/dashboard.js';
container.appendChild(Dashboard);

import Error404 from '../pages/404.js';
container.appendChild(Error404);

import Factbook from '../pages/factbook.js';
container.appendChild(Factbook);

import Menu from '../pages/menu.js';
container.appendChild(Menu);

import WashCounter from '../pages/wash-counter.js';
container.appendChild(WashCounter);

import Scheduler from '../pages/scheduler.js';
container.appendChild(Scheduler);

import Settings from '../pages/settings.js';
container.appendChild(Settings);

import CoinAGES from '../pages/coinages.js';
container.appendChild(CoinAGES);

import Activities from '../pages/activities.js';
container.appendChild(Activities);

// Apply bindings:
window.globalState = Voo.bind("body", window.globalState);