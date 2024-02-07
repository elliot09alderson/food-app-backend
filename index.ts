import express from "express";

import App from "./services/ExpressApp";
import DB from "./services/Database";

const startServer = async () => {
  const app = express();
  await DB();
  await App(app);
  app.listen(4000, () => console.log("app is running on 4000"));
};
startServer();
