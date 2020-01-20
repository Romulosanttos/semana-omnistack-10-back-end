const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");
const redisClient = require("./utils/redis-client");

const connections = [];
let io;

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    redisClient.setAsync(
      socket.id,
      JSON.stringify({
        id: socket.id,
        techs: parseStringAsArray(techs),
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        }
      })
    );
    redisClient.expireAsync(socket.id, 120);
    connections.push({
      id: socket.id,
      techs: parseStringAsArray(techs),
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      }
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
