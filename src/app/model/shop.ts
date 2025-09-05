import mongoose, { Schema, Document, models, model } from "mongoose";

const shopItems = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
});

const Shop = models.Shop || model("Shop", shopItems);

export default Shop


