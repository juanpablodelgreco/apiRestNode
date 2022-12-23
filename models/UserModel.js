import { model, Schema } from "mongoose";
import { RoleEnum } from "../enums/RoleEnum";

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory."],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory."],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [RoleEnum],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Para sacar la password de la respuesta
UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();

  return user;
}

const User = model("user", UserSchema);
export { User };
