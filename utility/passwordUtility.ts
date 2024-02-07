import bcrypt from "bcrypt";
import { VendorPayload } from "../dto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AuthPayload } from "../dto/Auth.dto";
import { Request } from "express";


export const GenSalt = async () => {
  return await bcrypt.genSalt();
};

export const GenEncpass = async (pass: string, salt: string) => {
  return await bcrypt.hash(pass, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  EncPassword: string,
  salt: string
) => {
  //comparing both pass
  return (await GenEncpass(enteredPassword, salt)) === EncPassword;
};

export const generateSignature = (payload: VendorPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};




// _________________VALIDATE SIGNATURE ____________________
export const validateSignature = async (req: Request) => {
  const signature = req.get("Authorization");
  if (signature) {    
    const payload = await jwt.verify(
      signature.split(" ")[1],  
      JWT_SECRET
    ) as AuthPayload;

    req.user = payload;
    return true; 
  }
  return false;
};
