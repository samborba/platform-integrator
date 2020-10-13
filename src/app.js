import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(process.env.APP_PORT || 3333, () => {
  console.log("Platform Integrator is running.");
});
