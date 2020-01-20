const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

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

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes);

server.listen(3000);
