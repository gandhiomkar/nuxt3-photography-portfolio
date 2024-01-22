import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  name: { type: String, required: true },
  contentType: { type: String, required: true },
});

export default model("Image", imageSchema);
