import { User } from "../models/UserModel";

export const userExists = async (userId) => {
  const user = await User.findOne({ id: userId, state: true });
  if (!user) throw new Error("User not found.");
};
