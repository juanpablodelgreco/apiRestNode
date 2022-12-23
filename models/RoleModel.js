import { model, Schema } from "mongoose";

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "Role name is mandatory"],
    unique: true,
  },
});

const Role = model("role", RoleSchema);
export { Role };
