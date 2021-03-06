var express = require("express");
var fortune = require("./lib/fortune.js");
var app = express();


// setup handlebars view engine
var handlebars = require("express-handlebars").create({ defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
  res.locals.showTests = req.query.test === "1";
  next();
});

// routes go here
app.get("/", function(req, res){
  res.render("home");
});

app.get("/about", function(req, res){
  res.render("about", {
    fortune: fortune.getFortune(),
    pageTestScript: "/qa/tests-about.js"
  });
});

// custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render("404");
});

// custom 500 page
app.use(function(err, req, res, next){
  console.err(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function(){
  console.log("Express started om http://localhost" + app.get("port") + "; press Crt-c to terminate.");
});
