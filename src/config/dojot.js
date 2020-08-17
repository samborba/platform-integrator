export default {
  dojot: process.env.DOJOT_ENDPOINT || "localhost:8000",
  username: process.env.DOJOT_USERNAME || "admin",
  passwd: process.env.DOJOT_PASSWORD || "admin",
  device: process.env.DOJOT_DEVICE || "all",
};
