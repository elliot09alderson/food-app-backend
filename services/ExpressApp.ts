import express, { Application } from "express";
import { AdminRouter, VendorRouter } from "../routes";
import bodyParser from "body-parser";
import path from "path";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // ______________FOR MULTER____________
  app.use("/images", express.static(path.join(__dirname, "images")));
  // ______________ ********____________
  app.use("/admin", AdminRouter);
  app.use("/vendor", VendorRouter);
  return app;
};
