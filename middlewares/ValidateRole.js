export const roleExists = async (role = '') => {
  const roleDb = await Role.findOne({ name: role });
  if (!roleDb) throw new Error("Role not found.");
};

export const hasRole = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if(!user) res.status(500).json({message:'Need verify role'});
  
    if(!roles.includes(user.role)) res.status(401).json({message: 'User don´t have persmissions'});
  
    next();
  }
};