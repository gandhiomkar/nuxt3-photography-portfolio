import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add the User name"],
  },
  email: {
    type: String,
    required: [true, "Please add the User email"],
  },
  password: {
    type: String,
    required: [true, "Please add the User password"],
  },
});

export default model("User", UserSchema);
