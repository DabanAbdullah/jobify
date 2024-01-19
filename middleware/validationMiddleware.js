import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import Users from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("company is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("company must be between 3 and 50 characters long")
    .trim(),
  body("position")
    .notEmpty()
    .withMessage("position is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("position must be between 3 and 50 characters long")
    .trim(),

  body("jobStatus")
    .notEmpty()
    .withMessage("jobStatus is required")
    .isIn(Object.values(JOB_STATUS))
    .withMessage(`jobStatus must in range of ${Object.values(JOB_STATUS)} `)
    .trim(),

  body("jobType")
    .notEmpty()
    .withMessage("jobType is required")
    .isIn(Object.values(JOB_TYPE))
    .withMessage(`jobType must in range of ${Object.values(JOB_TYPE)} `)
    .trim(),
]);

const isStrongPassword = (value) => {
  // Define your custom password criteria here
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return regex.test(value);
};

export const validateUserInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be between 3 and 50 characters long"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isLength({ min: 7, max: 80 })
    .withMessage("email must be between 7 and 80 characters long")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await Users.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 100 })
    .withMessage(`Password must be at least 5 characters long`)
    .custom((value) => isStrongPassword(value))
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .trim(),
]);

export const validateParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
  }),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
