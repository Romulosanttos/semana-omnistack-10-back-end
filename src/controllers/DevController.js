const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = data;

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: parseStringAsArray(techs),
        location
      });

      //filtrar as conexões há 10 km
      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude
        },
        parseStringAsArray(techs)
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },
  async update(req, res) {
    return res.json({ message: "update" });
  },
  async destroy(req, res) {
    return res.json({ message: "destroy" });
  }
};
