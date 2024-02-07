import express, { Application } from "express";
import { AdminRouter, ShoppingRouter, VendorRouter } from "../routes";
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
  app.use(ShoppingRouter);
  return app;
};
