import express, { Request, Response, NextFunction } from "express";
import {
  CustomerLogin,
  CustomerSignup,
  EditCustomerProfile,
  GetCustomerProfile,
  SendOtp,
  VerifyCustomer,
} from "../controllers";
export const customerRouter = express.Router();
/** ----------------- Sign up
 * -----------------**/
customerRouter.get("/signup", CustomerSignup);
/** ----------------- Login
 * -----------------**/
customerRouter.get("/login", CustomerLogin);

/** ================ AUTHENTICATION NEEDED BELOW
 * =================**/
/** ----------------- Verify Account
 * -----------------**/
customerRouter.patch("/verify", VerifyCustomer);

/** ----------------- OTP
 * -----------------**/
customerRouter.get("/otp", SendOtp);

/** ----------------- Profile
 * -----------------**/
customerRouter.get("/profile", GetCustomerProfile);
/** ----------------- Edit Profile
 * -----------------**/
customerRouter.patch("/profile", EditCustomerProfile);
