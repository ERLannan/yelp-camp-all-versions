//all middleware
var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

middlewareObj.isUsersCampground = function(req, res, next) {
    if(req.isAuthenticated()) {
       Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
               console.log(err);
               res.redirect("back");
           } else {
               if(foundCampground.author.id.equals(req.user._id)) {
                   next();
               } else {
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}


middlewareObj.isUsersComment = function(req, res, next) {
    if(req.isAuthenticated()) {
       Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err) {
               console.log(err);
               res.redirect("back");
           } else {
               if(foundComment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   console.log("not the users comment");
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}


module.exports = middlewareObj