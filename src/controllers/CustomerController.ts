import express, { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import {
  CreateCustomerInputs,
  OrderInputs,
  customerLoginInput,
  editCustomerProfileInputs,
} from "../dto/Customer.dto";
import {
  GenEncpass,
  GenSalt,
  ValidatePassword,
  generateSignature,
} from "../utility";
import { customerModel } from "../models/Customer";
import { GenerateOtp, onRequestOtp } from "../utility/notificationUtility";
import { FoodModel } from "../models/Food";

/**  Customer Signup  **/
export const CustomerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CreateCustomerInputs, req.body);
  const inputErrors = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }
  const { email, phone, password } = customerInputs;
  const salt = await GenSalt();
  const userPass = await GenEncpass(password, salt);

  const { otp, otp_expiry } = GenerateOtp();
  const existedCustomer = customerModel.find({ email });
  if (existedCustomer !== null) {
    return res.status(409).json({ message: "User Already Exist" });
  }
  const result = await customerModel.create({
    email,
    password: userPass,
    phone,
    otp,
    otp_expiry,
    firstName: "",
    lastName: "",
    address: "",
    verified: false,
    lat: 0,
    lng: 0,
  });

  if (result) {
    // semd otp to customer
    await onRequestOtp(otp, phone);
    // generate the signature
    const signature = generateSignature({
      _id: result._id,
      email: result.email,
      verified: result.verified,
    });

    // send result to client
    return res
      .status(201)
      .json({ signature, verified: result.verified, email: result.email });
  }

  return res.status(400).json({ message: `Error with Signup` });
};
/**  Customer Login **/
export const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(customerLoginInput, req.body);
  const inputErrors = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }

  const { email, password } = customerInputs;

  const customer = await customerModel.findOne({ email });

  if (customer) {
    const validation = await ValidatePassword(
      password,
      customer.password,
      customer.salt
    );

    if (validation) {
      // generate the signature
      const signature = generateSignature({
        _id: customer._id,
        email: customer.email,
        verified: customer.verified,
      });

      return res.status(200).json({
        signature,
        verified: customer.verified,
        email: customer.verified,
      });
    }
  }
  return res.status(404).json({ message: `Error with Login` });
};
/**  Customer Verify **/
export const VerifyCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;
  const customer = req.user;
  if (customer) {
    const profile = await customerModel.findById(customer._id);

    if (profile) {
      if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
        profile.verified = true;

        const updatedCustomerResponse = await profile.save();
        // generate the Signature
        const signature = generateSignature({
          _id: updatedCustomerResponse._id,
          email: updatedCustomerResponse.email,
          verified: updatedCustomerResponse.verified,
        });
        return res.status(201).json({
          signature,
          verified: updatedCustomerResponse.verified,
          email: updatedCustomerResponse.email,
        });
      }
    }
  }
  return res.status(400).json({
    message: "Error with OTP validation",
  });
};

/**  get customer profile  **/
export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  const userInputs = plainToClass(editCustomerProfileInputs, req.body);
  const profileErrors = await validate(userInputs, {
    validationError: { target: false },
  });

  if (profileErrors.length > 0) {
    return res.status(400).json(profileErrors);
  }

  if (customer) {
    const profile = await customerModel.findById(customer._id);
    if (profile) {
      return res.status(200).json({ profile });
    } else {
      return res.status(404).json({
        message: "customer not found",
      });
    }
  } else {
    return res.status(400).json({
      message: "some error with customer",
    });
  }
};

export const SendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;
  if (customer) {
    const profile = await customerModel.findById(customer._id);
    if (profile) {
      const { otp, otp_expiry } = await GenerateOtp();
      profile.otp = otp;
      profile.otp_expiry = otp_expiry;
      await profile.save();
      await onRequestOtp(otp, profile.phone);

      res
        .status(200)
        .json({ message: `OTP sent to your registered mobile number` });
    }
  } else {
    return res.status(404).json({
      message: "customer not found",
    });
  }
};
export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  const userInputs = plainToClass(editCustomerProfileInputs, req.body);
  const profileErrors = await validate(userInputs, {
    validationError: { target: false },
  });

  if (profileErrors.length > 0) {
    return res.status(400).json(profileErrors);
  }
  const { firstName, lastName, address } = userInputs;

  if (customer) {
    const profile = await customerModel.findById(customer._id);
    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.address = address;
      const result = await profile.save();
      return res.status(200).json({ result });
    }
  } else {
    return res.status(404).json({
      message: "customer not found",
    });
  }
};

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // grab current login customer
  const customer = req.user;
  if (customer) {
    // create an order ID
    const orderID = `${Math.floor(Math.random() * 89999) + 1000}`;

    const profile = await customerModel.findById(customer._id);
    // Grab Orders from Request [orderId and Unit ]
    const cart = <[OrderInputs]>req.body;
    const cartItems = Array();

    // calculate order amount
    let netAmount = 0.0;
    const foods = await FoodModel.find()
      .where("_id")
      .in(cart.map((item) => item._id))
      .exec();

    foods.map((food) => {
      cart.map(({ _id, unit }) => {
        if (food._id == _id) {
          netAmount += food.price * unit;
          cartItems.push({ food, unit });
        }
      });
    });
    // create order with item desc
    if (cartItems) {
    }
  }
  // update orders on user account
};
