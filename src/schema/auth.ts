import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup.string().trim().required("Username is required"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
