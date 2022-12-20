import { User } from "../models/UserModel";
import bcrypt from "bcrypt";

export const getUsers = (req, res) => {
  const { name, username, edad = 99 } = req.query;
  res.status(200).json({
    message: "Get users.",
    name,
    username,
    edad,
  });
};

export const createUser = async (req, res) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const userDb = await User.findOne({ email });
  if (userDb)
    return res.status(400).json({
      message: "Email already in use.",
    });

  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
  await user.save();

  res.status(201).json({
    message: "Create user.",
    user,
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Update user.",
    id,
  });
};

export const deleteUser = (req, res) => {
  res.status(200).json({
    message: "Delete user.",
  });
};
