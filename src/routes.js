import express from "express";
import IntegrationControllers from "./controllers/IntegrationsControllers";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).send("Platform Integrator\n");
});

routes.get("/api/v1/integrations", IntegrationControllers.index);
routes.post("/api/v1/integrations", IntegrationControllers.create);

module.exports = routes;
