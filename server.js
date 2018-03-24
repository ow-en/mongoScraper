var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 8000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mongoscraper"

mongoose.connect(MONGO_URI);
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
