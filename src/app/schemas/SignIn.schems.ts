import z from "zod";

export const SignInSchems = z.object({
               name:z.string(),
               email:z.string(),
               password:z.string()
})