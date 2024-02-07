import express, { Request, Response, NextFunction } from "express";
export const ShoppingRouter = express.Router();
/** -----------------FOOD AVAILABILITY
 * -----------------**/
ShoppingRouter.get("/:pincode");
/** -----------------TOP RESTAURANTS -----------------**/
ShoppingRouter.get("/top-restaurants/:pincode");
/** -----------------FOOD Under 30 Minutes -----------------**/
ShoppingRouter.get("/under-30-min/:pincode");
/** -----------------SEARCH FOOD  -----------------**/
ShoppingRouter.get("/search/:pincode");
/** -----------------FIND RESTAURANT BY ID-----------------**/
ShoppingRouter.get("/restarant/:id");
