const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose
  .connect("mongodb://mongo:27017/week10", {
    auth: {
      user: "omnistack",
      password: "omnistack",
      authSource: "admin"
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(console.log);

app.use(express.json());
app.use(routes);

app.listen(3000);
