import express from "express";
import bodyParser from "body-parser";

import { ServerConfig } from "./config";
import routes from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(ServerConfig.appPort);
