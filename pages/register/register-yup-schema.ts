import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup.string().required()
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastname: yup.string().required()
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup.string().email(),
  password: yup.string().required()
})