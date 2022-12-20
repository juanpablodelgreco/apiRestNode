import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/UserController";
import { validateFields } from "../middlewares/ValidateFields";

const router = Router();

router.get("/users", getUsers);
router.post(
  "/users",
  [
    check("email", "Invalid email.").isEmail(),
    check("name", "Name is mandatory.").not().isEmpty(),
    check("name", "Name is string.").isString(),
    check("password", "Password must have more than 5 letters.").isLength({
      min: 6,
    }),
    check("role", "Invalid role").isIn(["admin", "user"]),
    validateFields,
  ],
  createUser,
);
router.put("/users/:id", updateUser);
router.delete("/users", deleteUser);

export default router;
