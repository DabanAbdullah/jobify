import { Router } from "express";
import {
  validateJobInput,
  validateParam,
} from "../middleware/validationMiddleware.js";

import {
  getalljobs,
  getjobbyid,
  createjob,
  updatejob,
  deletejob,
} from "../controllers/jobsController.js";

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route("/").get(getalljobs).post(validateJobInput, createjob);
router
  .route("/:id")
  .get(validateParam, getjobbyid)
  .patch(validateJobInput, validateParam, updatejob)
  .delete(validateParam, deletejob);

export default router;
