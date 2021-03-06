// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Articles Schema
var Articles = require("./server/models/Articles");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// ------- DATABASE CONNECTION ------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 10
  Articles.find({}).sort([
    ["date", "descending"]
  ]).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api/saved", function(req, res) {
  console.log("BODY: " + req.body);

 var article = new Articles (req.body);

  // Save the article to MongoDB
  article.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    // or log the doc that was saved to the DB
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });
});

// API DELETE - your components will use this to delete a saved article in the database
app.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Articles.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      // Send Failure Header
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      // Send Success Header
      res.sendStatus(200);
    }
  });

});

// // CATCH ALL "*" - This redirect user to the "/" route for any unknown cases
app.get("*", function(req, res) {
  res.redirect("/");
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

