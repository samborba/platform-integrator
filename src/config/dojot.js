export default {
  dojot: process.env.DOJOT_ENDPOINT || "localhost:8000",
  username: process.env.DOJOT_USERNAME || "admin",
  passwd: process.env.DOJOT_PASSWORD || "admin",
  device: process.env.DOJOT_DEVICE || "all",
  mock: process.env.DOJOT_MOCK_DEVICE,
  mqttPort: process.env.MQTT_PORT || 1883,
};
