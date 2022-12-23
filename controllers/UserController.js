import { Password } from "../models/Password";
import { User } from "../models/UserModel";

export const getUsers = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  const usersPromise = User.find()
    .where({ state: true })
    .limit(limit)
    .skip(offset);
  const totalUsersPromise = User.count().where({ state: true });

  const [users, total] = await Promise.all([usersPromise, totalUsersPromise]);

  res.status(200).json({
    users,
    total,
  });
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  user.password = new Password().generate(password);
  await user.save();

  res.status(201).json({
    message: "Create user.",
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, google, email, ...rest } = req.body;

  if (password) rest.password = new Password().generate(password);

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    message: "Update user.",
    user,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    message: "User deleted.",
  });
};
