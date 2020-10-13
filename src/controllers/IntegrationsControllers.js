import { v4 as uuidv4 } from "uuid";
import knex from "../database";

import dojotSocketConnection from "../clients/dojot";
import platiagroSocketConnection from "../clients/platiagro";

export default {
  async index(req, res) {
    const response = await knex("integrations");
    return res.send({ integrations: response });
  },
  async create(req, res) {
    const uuid = uuidv4();
    const { origin, destination, experimentId } = req.body;

    await knex("integrations").insert({
      uuid,
      origin,
      destination,
      experimentId,
    });

    dojotSocketConnection(origin, destination);
    platiagroSocketConnection(experimentId);

    return res.send({
      message: "Integration was started",
      integration: { uuid, origin, destination, experimentId },
    });
  },
};
