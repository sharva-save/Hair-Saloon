import mongoose from "mongoose";
import z from "zod";

export const ShopSchema = z.object({
  title: z.string(),
  description: z.string(),
  img: z.string(),
});

export default ShopSchema
