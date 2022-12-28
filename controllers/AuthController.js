import { RoleEnum } from "../enums/RoleEnum";
import { googleVerify } from "../helper/GoogleVerify";
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

export const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  try {
    const { email, name, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (user && !user.state)
      return res.status(400).json({ message: "Talk to administrator" });

    if (!user) {
      const data = {
        name,
        email,
        password: " ",
        img: picture,
        role: RoleEnum.USER,
      };
      user = await new User(data).save();
    }

    const token = await new Jwt().generate({ id: user.id });

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid token." });
  }
};
