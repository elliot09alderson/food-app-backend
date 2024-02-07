import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    await mongoose
      .connect(MONGO_URI, { dbName: "food-app" })
      .then(() => console.log("DB CONNECTED"));
  } catch (error) {}
};
