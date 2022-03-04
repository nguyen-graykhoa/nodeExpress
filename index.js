const express = require("express");
const logger = require("morgan");
const usersRouter = require("./routes/users");
const clucksRouter = require("./routes/clucks.js");
 
 
const cookieParser = require("cookie-parser");

// path of assets
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(cookieParser());

// req.body
app.use(express.urlencoded({ extended: true }));

// grab the username from cookies and store it into locals
app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = "";
  if (username) {
    res.locals.username = username;
  }
  next();
});

app.get("/home", (req, res) => {
  res.render("home")
});

app.use(usersRouter);
app.use("/clucks", clucksRouter);

const PORT = 3000;
const DOMAIN = "localhost";

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on http://${DOMAIN}:${PORT}/clucks`);
});