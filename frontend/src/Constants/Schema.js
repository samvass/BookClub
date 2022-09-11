import * as yup from "yup";

const validationMessages = {
    email: "Must be a valid email",
    required: "This field is required",
}

export const loginSchema = yup.object().shape({
  email: yup.string().email(validationMessages.email).required(validationMessages.required),
  password: yup.string().required(validationMessages.required),
});