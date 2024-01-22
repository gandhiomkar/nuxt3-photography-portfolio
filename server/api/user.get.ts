import User from "../models/User";

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find();
    if (!users) {
      return "no users found";
    }
    return users;
  } catch (err) {
    console.log(err);
  }
});
