import { User } from "../models/UserModel";

export const emailExists = async (email) => {
  const userDb = await User.findOne({ email });
  if (userDb) throw new Error("Email already in use.");
};
