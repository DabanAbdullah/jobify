import { Router } from "express";
import {
  validateUserInput,
  validateParam,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

import { Login, Register } from "../controllers/authController.js";

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.post("/register", validateUserInput, Register);
router.post("/login", validateLoginInput, Login);

export default router;
