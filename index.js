/* --- Import Da Modules --- */
const express = require("express");
const app = express();
let bodyParser = require('body-parser');
const mongoose = require("mongoose")
const friendlyWords = require('friendly-words');
app.use(express.static(__dirname + "/public"));
app.use(express.json());


/* --- Routes: --- */
app.get("/", (req, res) => res.sendFile(__dirname + "/views/app.html"));
app.get("/viewcode",(req, res) => res.sendFile(__dirname + "/views/viewcode.html"));
app.get("/welcome", (req, res) => res.sendFile(__dirname + "/views/landing.html"));



/* --- Listen 4 Dem Reqs --- */
const listener = app.listen(process.env.PORT, () => console.log("Web Server UP"));

/* -- Save and Restore -- */
//Connect to database
mongoose.connect("mongodb+srv://standard:"+process.env.PASS+"@cluster0-srahm.mongodb.net/codejam-coronavirus?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology:true})

let Save = require("./models/save.js")
//Saving
app.post("/save", async function(req,res){
  let data = req.body
  let code = `${friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)]} ${friendlyWords.objects[Math.floor(Math.random() * friendlyWords.objects.length)]}`
  console.log(req.body)
  data.code = code
  await Save.create(data, function (err, small) {
  if (err){
    res.json({success:false})
  }
  res.json({success:true,code:code})
});

})
//Restore
app.post("/restore", async function(req,res){
  await Save.findOneAndDelete({code:req.body.code},function(err,obj){
    if(obj !== null){
      res.json({success:true,data:obj})
    }else{
      res.json({sucess:false})
    }
  })

 
  
  
})
