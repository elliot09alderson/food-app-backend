import mongoose, { Schema, Document, mongo } from "mongoose";
export interface OrderDoc extends Document {
  orderId: string;
  items: [any];
  totalAmount: number;
  orderDate: Date;
  paidThrough: string;
  paymentResponse: string;
  orderStatus: string;
}

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          requred: true,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date },
    paidThrough: { type: String },
    paymentResponse: { type: String },
    orderStatus: { type: String },
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

export const OrderModel = mongoose.model<OrderDoc>("order", OrderSchema);
