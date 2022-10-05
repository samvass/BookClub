import * as yup from "yup";

const validationMessages = {
    email: "Must be a valid email",
    required: "This field is required",
    passwordsNotMatching: "Your passwords do not match"
}

export const LOGIN_SCHEMA = yup.object().shape({
  password: yup.string().required(validationMessages.required),
  username: yup.string().required(validationMessages.email),
});

export const CREATE_ACCOUNT_SCHEMA = yup.object().shape({
  retypePassword: yup.string().required(validationMessages.required).oneOf([yup.ref('password')], validationMessages.passwordsNotMatching),
  password: yup.string().required(validationMessages.required),
  username: yup.string().required(validationMessages.required),
  email: yup.string().email(validationMessages.email).required(validationMessages.required),
});

export const SCHEMA_TEXT = {
  'email': {
    label: "What's your Email?",
    placeholder: "Enter your email.",
  },
  'username': {
    label: "What's your Username?",
    placeholder: "Enter your username."
  },
  'password': {
    label: "What's your Password?",
    placeholder: "Enter your password."
  },
  'retypePassword': {
    label: "Confirm your password",
    placeholder: "Confirm your password"
  },
}