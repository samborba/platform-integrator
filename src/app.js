import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

import routes from "./routes";

process.env.SERVER_KEY = uuidv4();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(process.env.APP_PORT || 3333);
