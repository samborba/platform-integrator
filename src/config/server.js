export default {
  serverPort: process.env.SERVER_PORT || 3030,
  secretKey: process.env.SERVER_KEY,
  mqttHost: process.env.MQTT_HOST,
};
