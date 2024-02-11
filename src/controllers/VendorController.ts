import { Request, Response, NextFunction } from "express";
import { CreateFoodInput, EditVendorProfilePayload, VendorLogin } from "../dto";
import { FindVendor } from "./AdminController";
import { ValidatePassword, generateSignature } from "../utility";
import { FoodModel } from "../models/Food";
import { VendorModel } from "../models/Vendor";

// ***vendor login
export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLogin>req.body;
  const existingVendor = await FindVendor("", email);
  if (existingVendor !== null) {
    // validation , give access
    const isValidated = await ValidatePassword(
      password,
      existingVendor.password,
      existingVendor.salt
    );
    if (isValidated) {
      // genereate signature
      const signature = generateSignature({
        _id: existingVendor._id,
        email: existingVendor.email,
        foodTypes: existingVendor.foodTypes,
        name: existingVendor.name,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "Invalid Credentials" });
    }
  }
  return res.json({
    message: "Invalid Credentials ",
  });
};

export const updateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foodTypes, name, address, phone } = <EditVendorProfilePayload>(
    req.body
  );
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);
    if (existingVendor != null) {
      existingVendor.name = name;
      existingVendor.address = address;
      existingVendor.phone = phone;
      existingVendor.foodTypes = foodTypes;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }
    return res.json(existingVendor);
  }
  return res.json({
    message: "Vendor info not Found",
  });
};

// Update VENDOR COVER IMAGE

export const updateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vendor = await FindVendor(user._id);
    if (vendor !== null) {
      // ___________FILE LOGIC 📁📂____________

      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      // _______________________________________________

      vendor.coverImages.push(...images);

      const result = await vendor.save();
      return res.json(result);
    }
    ``;
    return res.json({
      message: "Please try again ",
    });
  }
  return res.json({
    message: "Vendor info not Found",
  });
};

// _______________SERVICE UPDATE ______________
export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await FindVendor(user._id);
    if (existingVendor != null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }
    return res.json(existingVendor);
  }
  return res.json({
    message: "Vendor info not Found",
  });
};

// _______________VENDOR PROFILE UPDATE  🦯👩‍🏫______________
export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await FindVendor(user._id);
    return res.json(existingVendor);
  }
  return res.json({
    message: "Vendor info not Found",
  });
};

// ________________ADD FOOD HERE 🥓🥔🥕____________
export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInput
    >req.body;
    const vendor = await FindVendor(user._id);
    if (vendor !== null) {
      // ___________FILE LOGIC 📁📂____________

      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      // _______________________________________________
      const createdFood = await FoodModel.create({
        VendorId: vendor._id,
        name,
        description,
        category,
        foodType,
        readyTime,
        price,
        images,
      });
      vendor.foods.push(createdFood);
      const result = await vendor.save();
      return res.json(result);
    }
    return res.json({
      message: "Please try again ",
    });
  }
  return res.json({
    message: "Vendor info not Found",
  });
};

// ___________________GET FOODS 🥔🥓🥕 _______________
export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInput
    >req.body;

    const foods = await FoodModel.find({
      VendorId: user._id,
    });

    if (foods !== null) {
      return res.json(foods);
    }

    return res.json({
      message: "no foods found ",
    });
  }
  return res.json({
    message: "Vendor info not Found",
  });
};
