var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log("Error getting campgrounds: " + err);
        } else {
            res.render("campgrounds/index", {data: campgrounds, currentUser:req.user});
        }
    });
});

//Add campground to the DB, show all
router.post("/", function(req, res){
   var name = req.body.name;
   var img = req.body.imageurl;
   var desc = req.body.description;
   
   addCampground(name, img, desc);
   
   res.redirect("/campgrounds"); 
});

//Show add campground page
router.get("/new", function(req, res) {
   res.render("campgrounds/new");
});

//show specific campground
router.get("/:id", function(req, res) {
   //This will get a specific campground one day 
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

function addCampground(name, img, des) {
    Campground.create({
        name: name, 
        image: img,
        description: des
    }, function(err, item){
        if (err) {
            console.log("Error saving Campground to DB: " + err);
        } else {
            console.log("Campground created:");
            console.log(item);
        }
    });
}

// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next();
//     } 
//     res.redirect("/login");
// }

module.exports = router;