const { Router } = require("express");
const DevController = require("./controllers/devController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

module.exports = routes;
