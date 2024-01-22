import User from "@/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      setResponseStatus(event, 400, "user already exists");
      return { message: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    setResponseStatus(event, 201, "User created");
    return newUser;
  } catch (err) {
    console.log(err);
  }
});
