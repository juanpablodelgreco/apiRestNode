import { Router } from "express";
import { login } from "../controllers/AuthController";
import { check } from "express-validator";
import { validateFields } from "../middlewares/ValidateFields";

const router = Router();
const basePath = '/auth';

router.get(
  `${basePath}/login`,
  [
    check("email").isEmail(),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login,
);

export default router;
