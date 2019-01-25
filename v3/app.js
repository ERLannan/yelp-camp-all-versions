var express    = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
Campground     = require("./models/campground"),
seedDB         = require("./seeds");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

//seedDB();

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log("Error getting campgrounds: " + err);
        } else {
            res.render("index", {data: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var img = req.body.imageurl;
   var desc = req.body.description;
   
   addCampground(name, img, desc);
   
   res.redirect("/campgrounds"); 
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
   //This will get a specific campground one day 
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
   });
});

app.get("/*", function (req, res) {
    res.send("404 - Page not found");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp app server started"); 
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

function setupBasicData() {
    addCampground("Granite Hill","https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f6c47da5eeb5b0_340.jpg", "This is a huge granite hill. no bathrooms, no water." );
}