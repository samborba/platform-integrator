import socket from "socket.io";
import http from "http";
import { verify } from "jsonwebtoken";
import { ServerConfig } from "../config";

const server = http.Server();
const platIAoT = socket(server);

server.listen(ServerConfig.serverPort, () => {
  console.log(`### Server is up ###`);
});

async function platiagroFormat({ attrs }) {
  try {
    return JSON.stringify({
      data: {
        names: Object.keys(attrs),
        ndarray: [Object.values(attrs)],
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function dojotFormat({ data }) {
  const keys = data.names;
  const values = data.ndarray.shift();
  const response = {};

  keys.forEach((key, index) => {
    response[key] = values[index];
  });

  return JSON.stringify(response);
}

platIAoT.use((socket, next) => {
  const secretKey = ServerConfig.secretKey;

  if (!socket.handshake.query) return next(new Error("No token provided"));

  verify(socket.handshake.query.token, secretKey, (error, decoded) => {
    if (error) return next(new Error("Invalid token"));
    socket.decoded = decoded;
    return next();
  });
});

platIAoT.on("connection", (socket) => {
  console.log(`[Server] ${socket.decoded} client is now connected`);
  console.log(
    `[Server] Total of clients connected: ${platIAoT.engine.clientsCount}`
  );

  socket.on("receiving-dojot-data", async (rawData) => {
    const structured = await platiagroFormat(rawData);
    if (structured) platIAoT.emit("incoming-dojot-data", structured);
  });

  socket.on("disconnect", (event) => {
    console.log(
      `[Server] Client ${socket.decoded} was disconnected due to ${event}`
    );
    console.log(
      `[Server] Total of clients connected: ${platIAoT.engine.clientsCount}`
    );
  });

  socket.on("predict-result", async (response) => {
    const payload = await dojotFormat(response);

    platIAoT.emit("model-predict-response", payload);
  });

  socket.on("reconnection", () => {
    console.log(`[Server] ${socket.decoded} was reconnected`);
  });
});
