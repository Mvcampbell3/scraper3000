const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;
const path = require("path");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"))


app.get("/", (req, res) => {
  res.render("index");
})


app.listen(PORT, () => {
  console.log("live at http://localhost:"+PORT)
})