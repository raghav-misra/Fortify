import { h } from '../parts/jsx-helpers.js';

const Page = (h`
	<spa-view identifier="/settings" description="Settings" data-display="flex" className="flex-direction-column">
		<div style="text-align:center; margin-bottom:5%;">
			<h1>Change Profile Picture</h1>
			<input type="text" id="profileChangeInput" 
				className="lead" 
				placeholder="Your favorite thing" 
			/>
			<button id="profileChange" class="tile loose">
				<h5>Save Changes</h5>
			</button>
		</div>
    		<div style="text-align:center;">
			<button id="deleteProfile" class="tile loose">
				<h5>Delete Profile</h5>
			</button>
      			<button id="transferProfile" class="tile loose">
				<h5>Transfer Profile</h5>
			</button>
		</div>
	</spa-view>
`);
Page.addEventListener("whenConnected", () => {
	document.getElementById("profileChange").addEventListener("click", () =>{
   
    let newProfile = document.getElementById("profileChangeInput").value
    document.getElementById("profileChangeInput").value = ""
    	window.globalState.headerImage = "https://source.unsplash.com/900x900/?" + newProfile
    let user = JSON.parse(window.localStorage.getItem("user"))
		user.headerImage = window.globalState.headerImage
    window.localStorage.setItem("user",JSON.stringify(user))
    Swal.fire(
  'Set new profile!',
  '',
  'success'
)
    

  })
  	document.getElementById("deleteProfile").addEventListener("click", () =>{
        Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
    localStorage.clear()
    Swal.fire(
      'Profile Deleted!',
      '',
      'success'
    )
    location.href = "/"
  }
})
    

  })
  	document.getElementById("transferProfile").addEventListener("click", () =>{
        Swal.fire({
  title: 'Are you sure?',
  text: "This will allow you to transfer this profile to another device. You will not be able to use the same profile on this device after you transfer!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
    	document.getElementById("transferProfile").disabled = true
    Swal.fire({
      icon: "info",
      title:"Saving Profile",
      text: "This will take a bit.."
    })
    fetch('/save', {
    method: 'post',headers: {
  
    'Content-Type': 'application/json'
  },
    body: window.localStorage.getItem("user")
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
      if(data.success){
      localStorage.clear()
      location.href = "/viewcode?code="+data.code
      }else{
         Swal.fire({
      icon: "error",
      title:"Unable to save your profile",
      text: "Please try again later"
    })
      }
  });
   
  }
})
    

  })

});

Page.addEventListener("firstTime", () => {
	Swal.fire({
		icon: 'info',
		title: 'Settings',
		text: 'Modify, delete and export your Fortify account.',
		footer: '<span>Pretty Straightforward</span>' 
	});
});

export default Page;