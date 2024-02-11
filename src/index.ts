import express from "express";

import App from "./services/ExpressApp";
import DB from "./services/Database";
import { PORT } from "./config";

const startServer = async () => {
  const app = express();
  await DB();
  await App(app);
  app.listen(PORT, () => console.log("app is running on 4000"));
};
startServer();
