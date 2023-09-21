// Creating the simple schema for validating the inputs
import { object, string} from "yup";

export const userSchema = object({
  body: object({
    name: string().required("User name is required "),
    email: string().required("email is required ").email("email must be a valid email"),
    password: string()
      .required("Password is required")
      .min(6, "The password should be at least  6 characters long ")
      .matches(
        /^[a-zA-Z0-9_.\(\)\-\$]*$/,
        "Password can only contain letters  A to Z and symbols  -_([)}.$"
      ),
    confirmPassword: string()
      .required("Password confirmation is required")
      .min(6, "The password should be at least  6 characters long ")
      .matches(
        /^[a-zA-Z0-9_.\(\)\-\$]*$/,
        "Password can only contain letters  A to Z and symbols  -_([)}.$"
      ),
  }),
});



export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.\(\)-]*$/, "Password can only contain letters  A to Z and symbols  -_([)}.$"),

    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});


