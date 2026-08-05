import * as yup from "yup"

export const registerSchema = yup.object({
  userName:yup.string().required().min(3).max(10),
  fullName:yup.string().required().min(5).max(15),
  email:yup.string().email().required(),
  password:yup.string().required(),
  phoneNumber:yup.string().required()
})
