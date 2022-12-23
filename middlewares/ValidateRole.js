import { Role } from "../models/RoleModel";

export const roleExists = async (role = '') => {
  const roleDb = await Role.findOne({ name: role });
  if (!roleDb) throw new Error("Role not found.");
};
