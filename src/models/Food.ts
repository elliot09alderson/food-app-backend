import mongoose, { Schema, Document, mongo } from "mongoose";
export interface FoodDoc extends Document {
  name: string;
  VendorId: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  images: [string];
}

const FoodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    VendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    foodType: { type: String, required: true, trim: true },
    readyTime: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    images: { type: [String], trim: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const FoodModel = mongoose.model<FoodDoc>("food", FoodSchema);
