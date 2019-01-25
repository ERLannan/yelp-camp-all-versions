var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var data = [
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"}
];

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res) {

    
    res.render("campgrounds", {data: data});
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var img = req.body.imageurl;
   
   data.push({name: name, image: img});
   
   res.redirect("/campgrounds"); 
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});

app.get("/*", function (req, res) {
    res.send("404 - Page not found");
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp app server started"); 
});