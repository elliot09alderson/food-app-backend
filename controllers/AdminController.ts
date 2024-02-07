import { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto/vendor.dto";
import { VendorModel } from "../models/Vendor";
import { GenEncpass, GenSalt } from "../utility";

// ******* Some GEnerics
export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await VendorModel.findOne({ email });
  } else {
    return await VendorModel.findById(id);
  }
};

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    foodTypes,
    pincode,
    address,
    phone,
    email,
    password,
    ownerName,
    serviceAvailable,
  } = <createVendorInput>req.body;

  // ***checking if vendor already exist
  const isExist = await FindVendor(" ", email);
  if (isExist != null) {
    return res.json({ message: "Already exist" });
  }
  // ***salt generation and pass Encryption
  const salt = await GenSalt();
  const EncPassword = await GenEncpass(password, salt);
  const createVendor = await VendorModel.create({
    name,
    foodTypes,
    pincode,
    address,
    phone,
    salt,
    email,
    password: EncPassword,
    ownerName,
    coverImages: [],
    serviceAvailable,
    foods: [],
  });
  res.json({
    message: "VEndor Created SuccessFully",
    VendorDetail: createVendor,
  });
};

// *** to get all vendors
export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const VEndors = await VendorModel.find();
  if (VEndors !== null) {
    return res.json(VEndors);
  }
  return res.json({ message: "No vendors Available" });
};

//*** to get VEndor By ID
export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const VEndorId = req.params.id;
  const VEndor = await FindVendor(VEndorId);
  if (VEndor != null) {
    return res.json(VEndor);
  }
  return res.json({ message: "Vendors data not available" });
};
