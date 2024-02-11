import express, { Application } from "express";
import {
  AdminRouter,
  ShoppingRouter,
  VendorRouter,
  customerRouter,
} from "../routes";
import path from "path";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ______________FOR MULTER____________
  app.use("/images", express.static(path.join(__dirname, "images")));
  // ______________ ********____________
  app.use("/admin", AdminRouter);
  app.use("/vendor", VendorRouter);
  app.use("/customer", customerRouter);
  app.use(ShoppingRouter);
  return app;
};
