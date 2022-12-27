import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/UserController";
import { RoleEnum } from "../enums/RoleEnum";
import { emailExists } from "../middlewares/ValidateEmail";
import { validateJwt } from "../middlewares/ValidateJwt";
import { roleExists, hasRole } from "../middlewares/ValidateRole";
import { validateFields } from "../middlewares/ValidateFields";
import { userExists } from "../middlewares/ValidateUser";

const router = Router();
const basePath = "/users";

router.get(`${basePath}`, getUsers);
router.post(
  `${basePath}`,
  [
    check("email", "Invalid email.").isEmail(),
    check("name", "Name is mandatory.").not().isEmpty(),
    check("name", "Name is string.").isString(),
    check("password", "Password must have more than 5 letters.").isLength({
      min: 6,
    }),
    check("email").custom(emailExists),
    check("role").custom(roleExists),
    validateFields,
  ],
  createUser,
);
router.put(
  `${basePath}/:id`,
  [
    check("id", "Incorrect ID").isMongoId(),
    validateFields,
    check("id").custom(userExists),
    check("role").custom(roleExists),
  ],
  updateUser,
);
router.delete(
  `${basePath}/:id`,
  [
    validateJwt,
    hasRole(RoleEnum.ADMIN, RoleEnum.USER),
    check("id").custom(userExists),
    validateFields,
  ],
  deleteUser,
);

export default router;
