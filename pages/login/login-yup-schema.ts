import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required()
})