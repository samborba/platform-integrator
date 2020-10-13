import Axios from "axios";
import io from "socket.io-client";
import { sign } from "jsonwebtoken";
import mqtt from "mqtt";

import { DojotConfig, ServerConfig } from "../config";

const { username, passwd, dojot, mqttPort } = DojotConfig;
const { serverPort, secretKey } = ServerConfig;

const host = dojot.split(":").shift();
const serverEndpoint = `http://localhost:${serverPort}/`;

async function getAuthJwt(username, passwd) {
  const userAuthUrl = `${dojot}/auth`;
  try {
    const response = await Axios.post(userAuthUrl, {
      username,
      passwd,
    });

    return response.data.jwt;
  } catch (error) {
    console.log(error);
  }
}

async function getSocketToken(endpoint, username, password) {
  const authJwt = await getAuthJwt(username, password);

  try {
    const response = await Axios.get(`${dojot}/${endpoint}`, {
      headers: { Authorization: `Bearer ${authJwt}` },
    });

    return { token: response.data.token };
  } catch (error) {
    console.log(error);
  }
}

function getServerToken(payload, secretKey) {
  return { token: sign(payload, secretKey) };
}

module.exports = async function (device, mock) {
  const token = await getSocketToken("stream/socketio", username, passwd);
  const serverToken = getServerToken("Dojot", secretKey);

  const serverConnection = io(serverEndpoint, {
    query: serverToken,
    transports: ["websocket"],
  });

  console.log("[Dojot Client] Waiting for server connection...");

  serverConnection.on("connect", () => {
    console.log("[Dojot Client] Connected to server");

    const dojotClient = io(`${dojot}`, {
      query: token,
      transports: ["websocket"],
    });

    dojotClient.on(device, (inconmingData) => {
      serverConnection.emit("receiving-dojot-data", inconmingData);
    });

    serverConnection.on("model-predict-response", (payload) => {
      const topic = `/${username}/${mock}/attrs`;
      const client = mqtt.connect(`mqtt://${host}:${mqttPort}`, {
        keepalive: 0,
        connectTimeout: 60 * 60 * 1000,
      });

      client.on("connect", () => {
        client.publish(topic, payload);
      });
    });

    serverConnection.on("disconnect", (event) => {
      console.log(
        `[Dojot Client] disconnected from the server due to ${event}`
      );
      console.log("[Dojot Client] Trying to reconnect to the server...");
      serverConnection.io.reconnection();
    });
  });

  serverConnection.on("error", (error) => {
    console.log(error);
  });
};
