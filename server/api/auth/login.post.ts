import User from "@/server/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    setResponseStatus(event, 401, "unauthorized");
    return { message: "Invalid credentials" };
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    setResponseStatus(event, 401, "unauthorized");
    return { message: "Invalid password" };
  }

  // Generate a JSON Web Token (JWT) for authentication
  const token = jwt.sign({ userId: user._id }, useRuntimeConfig().secret);

  // Return the token to the client
  setResponseStatus(event, 200, "logged in");
  return token;
});
