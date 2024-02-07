import express, { Request, Response, NextFunction } from "express";
export const AdminRouter = express.Router();
import { createVendor, getVendorById, getVendors } from "../controllers";

AdminRouter.post("/vendor", createVendor);
AdminRouter.get("/vendor/all", getVendors);
AdminRouter.get("/vendor/:id", getVendorById);

