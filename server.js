var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

const herokuURL = "https://radiant-harbor-70874.herokuapp.com/";
mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 8000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

mongoose.connect("mongodb://" + herokuURL);
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection active");
});

require("./controllers/newsController.js")(app);

app.listen(PORT, function(){
  console.log("Listening on " + PORT);
});
