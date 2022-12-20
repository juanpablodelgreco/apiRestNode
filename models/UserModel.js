import { model, Schema } from "mongoose";

const userSchema = Schema({
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
    enum: ["admin", "user"],
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

const User = model("user", userSchema);
export { User };
