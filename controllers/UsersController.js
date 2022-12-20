export const getUsers = (req, res) => {
  const { name, username, edad = 99 } = req.query;
  res.status(200).json({
    message: "Get users.",
    name,
    username,
    edad
  });
};

export const createUser = (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Create user.",
    body,
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
