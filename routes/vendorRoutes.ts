import express, { Request, Response, NextFunction } from "express";
import {
  vendorLogin,
  updateVendorService,
  getVendorProfile,
  updateVendorProfile,
  AddFood,
  GetFoods,
  updateVendorCoverImage,
} from "../controllers";
import fs from "fs";
import multer from "multer";
// _________________MULTER _________________
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "images";
    // Create the directory if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, function (err) {
      if (err) {
        console.error("Error creating directory:", err);
      }
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "_") + "_" + file.originalname
    );
  },
});

const uploadImages = multer({ storage: imageStorage }).array("images", 10);

// _____________ **************  _________________

import { Authenticate } from "../middlewares";
export const VendorRouter = express.Router();

VendorRouter.post("/login", vendorLogin);
VendorRouter.get("/profile", Authenticate, getVendorProfile);
VendorRouter.patch("/profile", Authenticate, updateVendorProfile);
VendorRouter.patch(
  "/coverimage",
  Authenticate,
  uploadImages,
  updateVendorCoverImage
);
VendorRouter.patch("/service", Authenticate, updateVendorService);

VendorRouter.post("/food", Authenticate, uploadImages, AddFood);
VendorRouter.get("/foods", Authenticate, GetFoods);

VendorRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "hello from vendor",
  });
});
