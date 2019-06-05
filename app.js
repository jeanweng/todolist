// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const app = express();

const items = ["Buy food","Cook food","Eat food"];
const workItems = [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Home route
app.get('/', function(req, res) {
  const day = date.getDay();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req,res){
  const item = req.body.newItem;
  if(req.body.list === 'Work'){
    workItems.push(item);
    res.redirect("/work");
  }else{

    items.push(item);
    res.redirect("/");
  }
});
//Work route
app.get("/work",function(req,res){
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

//About
app.get("/about",function(req,res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port 3000.");
})
