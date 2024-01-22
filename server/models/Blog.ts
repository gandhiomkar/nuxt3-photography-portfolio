import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "please add title"],
  },
  body: {
    type: String,
    required: [true, "please add body"],
  },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true },
});

export default model("Blog", blogSchema);
