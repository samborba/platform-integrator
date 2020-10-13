import io from "socket.io-client";
import Axios from "axios";
import { sign } from "jsonwebtoken";
import { ServerConfig, PlatiagroConfig } from "../config";

const { secretKey, serverPort } = ServerConfig;
const { platiagro } = PlatiagroConfig;

const serverEndpoint = `http://localhost:${serverPort}/`;

function getServerToken(payload, secretKey) {
  return { token: sign(payload, secretKey) };
}

module.exports = (experimentId) => {
  const modelEndpoint = `${platiagro}/seldon/deployments/${experimentId}/api/v1.0/predictions`;
  const token = getServerToken("PlatIAgro", secretKey);

  const platiagroClient = io(serverEndpoint, {
    query: token,
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionAttempts: Infinity,
  });

  console.log("[PlatIAgro Client] Waiting for server connection...");

  platiagroClient.on("connect", () => {
    console.log("[PlatIAgro Client] Connected to the server");

    platiagroClient.on("incoming-dojot-data", async (structuredData) => {
      const response = await Axios.post(modelEndpoint, structuredData, {
        headers: { "Content-type": "application/json" },
      }).catch((error) => {
        console.log(error);
      });

      platiagroClient.emit("predict-result", response.data);
    });

    platiagroClient.on("disconnect", (event) => {
      console.log(
        `[PlatIAgro Client] Disconnected from server due to ${event}`
      );
      console.log("[PlatIAgro Client] Trying to reconnect to the server...");
      platiagroClient.io.reconnection();
    });

    platiagroClient.on("reconnection", () => {
      console.log("[PlatIAgro Client] Reconnected to the server");
    });

    platiagroClient.on("reconnect_failed", (error) => {
      console.log(
        `[Platiagro Client] It looks like the server is down ${error}`
      );
    });
  });
}
