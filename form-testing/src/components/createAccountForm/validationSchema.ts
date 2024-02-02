import * as Yup from "yup"

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "The password must be longer than 6 symbols"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .min(6, "The confirm password must be longer than 6 symbols"),
  privacyPolicy: Yup.boolean().oneOf(
    [true],
    "Please agree to the privacy policy",
  ),
})
