import { Schema, model } from "mongoose";

const contactReq = new Schema({
  name: {
    type: String,
    required: [true, "please add name"],
  },
  email: {
    type: String,
    required: [true, "please add email"],
  },
  contactnumber: {
    type: String,
    required: [true, "please add contact number"],
  },
  subject: {
    type: String,
    required: [true, "please add subject"],
  },
  message: {
    type: String,
    required: [true, "please add message"],
  },
  date: { type: Date, default: Date.now },
});

export default model("ContactReq", contactReq);
