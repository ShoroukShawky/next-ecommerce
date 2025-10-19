import * as z from "zod"
export const loginSchema = z.object({
  
    email:z.string().nonempty("this field is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invailed email"),
    password:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"invalid password"),

})


export const forgetSchema = z.object({
  
    email:z.string().nonempty("this field is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invailed email"),

})



export const verifyCodeSchema = z.object({
  
    resetCode:z.string().nonempty("this field is required")

})

export const resetPasswordSchema = z.object({
  
   email:z.string().nonempty("this field is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invailed email"),
    newPassword:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."),


})


export type verifyCodeSchemaForm = z.infer<typeof verifyCodeSchema>
export type forgetSchemaForm = z.infer<typeof forgetSchema>
export type loginSchemaForm = z.infer<typeof loginSchema>
export type resetPasswordSchemaForm = z.infer<typeof resetPasswordSchema>


