import express, { Request, Response, NextFunction } from "express";
import {
  GetFoodByAvailability,
  GetFoodUnder30Min,
  GetRestuarantById,
  GetTopRestaurants,
  SearchFoods,
} from "../controllers";
export const ShoppingRouter = express.Router();
/** -----------------FOOD AVAILABILITY
 * -----------------**/
ShoppingRouter.get("/:pincode", GetFoodByAvailability);
/** -----------------TOP RESTAURANTS -----------------**/
ShoppingRouter.get("/top-restaurants/:pincode", GetTopRestaurants);
/** -----------------FOOD Under 30 Minutes -----------------**/
ShoppingRouter.get("/under-30-min/:pincode", GetFoodUnder30Min);
/** -----------------SEARCH FOOD  -----------------**/
ShoppingRouter.get("/search/:pincode", SearchFoods);
/** -----------------FIND RESTAURANT BY ID-----------------**/
ShoppingRouter.get("/restarant/:id", GetRestuarantById);
