import mongoose, { Schema, Document, Model } from "mongoose";
interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  serviceAvailable: boolean;
  foodTypes: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  coverImages: [string];
  rating: number;
  salt: string;
  foods: any;
}

const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true, trim: true },

    foodTypes: [String],
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: [String],
    rating: { type: Number },

    foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "food" }],
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

export const VendorModel = mongoose.model<VendorDoc>("vendor", VendorSchema);
