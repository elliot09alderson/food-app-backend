import mongoose, { Schema, Document, Model } from "mongoose";
import { OrderDoc } from "./Order";
interface CustomerDoc extends Document {
  email: string;
  salt: string;
  address: string;
  password: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  phone: string;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
  orders: [OrderDoc];
}

const customerSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    salt: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    verified: { type: Boolean, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    otp_expiry: { type: Date, required: true, trim: true },
    otp: { type: Number, required: true, trim: true },
    lat: { type: Number },
    lng: { type: Number },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
    // foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "food" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const customerModel = mongoose.model<CustomerDoc>(
  "customer",
  customerSchema
);
