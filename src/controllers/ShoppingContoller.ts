import express, { Request, Response, NextFunction } from "express";
import { VendorModel } from "../models/Vendor";
import { FoodDoc } from "../models/Food";
export const GetFoodByAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await VendorModel.find({
    pincode,
    serviceAvailable: true,
  })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data Not Found" });
};
export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await VendorModel.find({
    pincode,
    serviceAvailable: true,
  })
    .sort([["rating", "descending"]])
    .limit(10);

  if (result.length > 0) {
    res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data Not Found" });
};
export const GetFoodUnder30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await VendorModel.find({
    pincode,
    serviceAvailable: true,
  }).populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];
    result.map((vendor) => {
      const foods = vendor.foods as [FoodDoc];
      foodResult.push(...foods.filter((food) => food.readyTime <= 30));
    });

    return res.status(200).json(foodResult);
  }

  if (result.length > 0) {
    res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data Not Found" });
};

/**  _________ SEARCH FOODS  ___________**/
export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await VendorModel.find({
    pincode,
    serviceAvailable: true,
  }).populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];
    result.map((item) => {
      foodResult.push(...item.foods);
    });

    return res.status(200).json(foodResult);
  }

  if (result.length > 0) {
    res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data Not Found" });
};
export const GetRestuarantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const result = await VendorModel.findById(id).populate("foods");

  if (result) {
    res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data Not Found" });
};
