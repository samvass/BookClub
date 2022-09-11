import * as yup from "yup";

const validationMessages = {
    email: "Must be a valid email",
    required: "This field is required",
    passwordsNotMatching: "Your passwords do not match"
}

export const LOGIN_SCHEMA = yup.object().shape({
  username: yup.string().required(validationMessages.email),
  password: yup.string().required(validationMessages.required),
});

export const CREATE_ACCOUNT_SCHEMA = yup.object().shape({
  email: yup.string().email(validationMessages.email).required(validationMessages.required),
  username: yup.string().required(validationMessages.required),
  password: yup.string().required(validationMessages.required),
  retypePassword: yup.string().required(validationMessages.required).oneOf([yup.ref('password')], validationMessages.passwordsNotMatching)
});