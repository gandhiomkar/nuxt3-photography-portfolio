import { Schema, model } from "mongoose";
import Image from "./Image";

const albumSchema = new Schema({
  title: String,
  images: [{ type: String, required: true }],
});

export default model("Album", albumSchema);
