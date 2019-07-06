const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Load keys
const keys = require("./config/keys");

// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB Database
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`MongoDB Connected`))
  .catch(err => console.log(`Error: ${err}`));

// Load Routes
const auth = require("./routes/auth");
const books = require("./routes/api/books");
const users = require("./routes/api/users");
const answers = require("./routes/api/answers");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(
  session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/public/finalbook.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/adminpage.html");
});

// Use Routes
app.use("/auth", auth);
app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/answers", answers);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
