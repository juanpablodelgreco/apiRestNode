import { Jwt } from "../models/Jwt";
import { Password } from "../models/Password";
import { User } from "../models/UserModel";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, state: true });

  if (!user)
    return res.status(400).json({ message: "Incorrect user or password." });

  const isValidPassword = new Password().verify(password, user.password);
  if (!isValidPassword)
    return res.status(400).json({ message: "Incorrect user or password." });

  const token = await new Jwt().generate({ id: user.id });

  return res.json({
    user,
    token,
  });
};
