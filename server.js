const express = require("express");
const passport=require('passport');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const app = express();
//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//DB config
const db = require("./config/keys");
const uri = db.database;
//connect to mongoose
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log(err);
  });
//passport middle ware
app.use(passport.inititalize());
//passport config
require('./config/passport')
//use route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

app.listen(db.port, () => {
  console.log(` server running on port ${db.port} `);
});
