  import { h,addComponentStyles  } from '../parts/jsx-helpers.js';
  import anime from '../parts/anime.js';

const defaultActs = [
	{title:"Running",icon:"🏃"}, 
	{title:"Biking",icon:"🚴"}, 
	{title:"Hiking",icon:"🥾"},
	{title:"Playing CoinAGES!", icon: "💰"}
]
  
const Page = (h`
	<spa-view identifier="/apps/activities" description="Activites" data-display="flex" className="flex-direction-column">
    <div id="blackSolid"></div>
     <div className="d-flex align-items-center justify-content-center flex-direction-column"
		data-display="flex">
    	<br /><br />
		<h1>Score: <span className="h1" v-bind="innerText :: safetyScore"></span>%</h1>
		<hr spacer />
    <div id="cirBtn" style="position:fixed; top:10%; display:none">
    	<div id="large" onClick=${logActivity} className="cirque c-large">
			<div id="med" className="cirque c-med">
				<div id="small" className="cirque c-small">
					<h3 className="mono color-accent text-center">
            I did an activity!
					</h3>
				</div>
        </div>
			</div>
      </div>
      </div>
     <div>
      Social distancing helps slow down the spread of the virus. When doing these acitvites, stay at least 6 feet away from other people.<br></br> When adding activities, make sure you can do them without going near other people.
      </div>
		<div id="activitiesContainer" className="tile-container flex-1 d-flex justify-content-center" style="flex-wrap: wrap">
      
		</div>
     
   
	</spa-view>
`);

function didActivity(){
document.getElementById("blackSolid").style.display = "block"
document.getElementById("cirBtn").style.display = "block"
	document.getElementById("large").style.transform = "scale(0)";
	document.getElementById("med").style.transform = "scale(0)";
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
anime.timeline()
.add({
    targets: "#blackSolid",
    opacity: 0.7,
    easing: "easeOutExpo",
    duration: 1000
  })
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

}
function logActivity(){
  window.globalState.safetyScore += 5;
  const newData = JSON.parse(localStorage.getItem("user"));
newData.safetyScore = window.globalState.safetyScore;
localStorage.setItem("user", JSON.stringify(newData));
  anime({
    targets: "#blackSolid",
    opacity: 0,
    easing: "easeOutExpo",
    duration: 1000
  })
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
   setTimeout(() =>{
document.getElementById("blackSolid").style.display = "none"
document.getElementById("cirBtn").style.display = "none"


  },1000)

}
function	 deleteActivity(){
  let acts = JSON.parse(window.localStorage.getItem("user")).customActivities
	let options = {}
	let pos = {}
	acts.forEach(function(act, i) {
		options[act.title] = act.title
		pos[act.title] = i
	})
 
Swal.fire({
		title: 'Delete an event',
		input: 'select',
		inputOptions: options,
		inputPlaceholder: 'Select an event to delete',
		showCancelButton: true,
		inputValidator: (value) => {
			return new Promise((resolve) => {
				acts.splice(pos[value], 1)
				let user = JSON.parse(window.localStorage.getItem('user'))
				user.customActivities = acts
				window.localStorage.setItem('user', JSON.stringify(user))
        buildActivites()
        resolve()
			})
		}
	})

}
function createActivty(){
 
	Swal.mixin({
		input: 'text',
		confirmButtonText: 'Next &rarr;',
		showCancelButton: true,
		progressSteps: ['1', '2']
	}).queue([
		{
			title: 'Activty Title',
			text: 'Name of the activity'
		},
		{
			title: 'Activity Icon ',
			html: '<button onclick="window.showPicker(this)" class="tile loose">Show Icons</button>'
		}
	]).then((result) => {
		if (result.value) {
      let act = {
        title:  result.value[0],
        icon:  result.value[1]
      }
      let user = JSON.parse(window.localStorage.getItem("user"))
      user.customActivities.push(act)
			window.localStorage.setItem("user", JSON.stringify(user))
      window.buildActivites()
			Swal.fire({
				title: 'Activity Added!',
				confirmButtonText: 'Continue'
			})
		}
	})
}

window.buildActivites = function(){

   while(document.getElementById("activitiesContainer").firstChild){
       document.getElementById("activitiesContainer").removeChild(document.getElementById("activitiesContainer").firstChild)
   }
    var customActs = JSON.parse(window.localStorage.getItem("user")).customActivities
         customActs.forEach((act) =>{
    let e = document.createElement("div") //create tiles
    e.classList.add("tile")
    let text = document.createElement("h5")
    text.innerText = act.title
     let icon = document.createElement("h5")
    icon.innerText = act.icon
    e.appendChild(icon)
    e.appendChild(text)
    document.getElementById("activitiesContainer").appendChild(e)
    e.addEventListener("click",didActivity)
   

    })
    defaultActs.forEach((act,i) =>{
    let e = document.createElement("div") //create tiles
    e.classList.add("tile")
    let text = document.createElement("h5")
    text.innerText = act.title
     let icon = document.createElement("h5")
    icon.innerText = act.icon
    e.appendChild(icon)
    e.appendChild(text)
    document.getElementById("activitiesContainer").appendChild(e)
    e.addEventListener("click",didActivity)
    if(i == defaultActs.length - 1){ //Add custom tile at the end
         let e = document.createElement("div")
        e.classList.add("tile") 
         e.classList.add("tile-accent")
		 e.classList.add("w-large")
         let text = document.createElement("h5")
         text.innerText = "Create Custom Activty"
         let icon = document.createElement("h5")
           icon.innerText = "⭐"
          e.appendChild(icon)
         e.appendChild(text)
         document.getElementById("activitiesContainer").appendChild(e)
         e.addEventListener("click",createActivty)

            e = document.createElement("div") 
             e.classList.add("tile")
         e.classList.add("tile-accent")
		 e.classList.add("w-large")
          text = document.createElement("h5")
         text.innerText = "Delete Custom Activty"
          icon = document.createElement("h5")
           icon.innerText = "🗑️"
          e.appendChild(icon)
         e.appendChild(text)
         document.getElementById("activitiesContainer").appendChild(e)
         e.addEventListener("click",deleteActivity)
    }

    })

}

Page.addEventListener("whenConnected", () => {
   window.picker = new EmojiButton();
   window.showPicker = function(e){
     picker.togglePicker(e);
   }
  window.picker.on('emoji', (emoji) => {
    document.querySelector(".swal2-input").value+=emoji
  });
  window.buildActivites()

  





});

addComponentStyles(`
	spa-view[identifier="/apps/activities"] .cirque {
		border-radius: 50%;
		justify-content: center;
		display: inline-flex;
		align-items: center;
    z-index: 2;


	}

	spa-view[identifier="/apps/activities"] .cirque.c-large {
		width: 24rem;
		height: 24rem;
		background: white;
	}

  spa-view[identifier="/apps/activities"] .cirque.c-large {
		width: 24rem;
		height: 24rem;
		background: white;
	}

	#blackSolid{
		position:fixed;
		left:0px;
		height: 100vh;
		width: 100vw;
		background-color:black;
		opacity:0;
		display:none;
	}

	spa-view[identifier="/apps/activities"] .cirque.c-small {
		width: 16rem;
		height: 16rem;
		background: var(--background-accent);
	}

	spa-view[identifier="/apps/activities"] .cirque.c-med {
		width: 20rem;
		height: 20rem;
		background: var(--accent);
	}
`);

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Activities',
		text: 'It\'s super easy to get bored while quarantined by yourself, but Fortify helps you figure out what you can do on your own. Create solo activities to do, anything from a home workout to a video game session. Plus, whenever you do a solo activity, Fortify adds <b>5 points</b> to your daily safety score!',
		footer: '<span>Let\'s get active!</span>' 
	});
});


export default Page