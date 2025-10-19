import * as z from "zod"
export const registerSchema = z.object({
    name:z.string().nonempty("this field is required").min(2,"Too short — add a few more letters!").max(10,"Keep it short — max 10 characters."),
    email:z.string().nonempty("this field is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invailed email"),
    password:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."),
    rePassword:z.string().nonempty("this field is required"),
    phone:z.string().nonempty("this field is required").regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)
}).refine((data)=>data.password===data.rePassword,{
    path:["rePassword"],
    message:"not matched password"
})


export type registerSchemaForm = z.infer<typeof registerSchema>