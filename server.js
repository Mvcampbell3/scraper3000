const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"))

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper3000";

mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log("live at http://localhost:"+PORT)
})