import { Router } from "express";
import { googleSignIn, login } from "../controllers/AuthController";
import { check } from "express-validator";
import { validateFields } from "../middlewares/ValidateFields";

const router = Router();
const basePath = '/auth';

router.post(
  `${basePath}/login`,
  [
    check("email").isEmail(),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login,
);

router.post(
  `${basePath}/google`,
  [
    check("id_token", 'id_token is mandatory').not().isEmpty(),
    validateFields,
  ],
  googleSignIn,
);

export default router;
