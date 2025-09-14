import z from "zod";

export const SignInSchems = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 chars"),
  isAdmin: z.preprocess(
    (val) => (val === "true" || val === true), // normalize string → boolean
    z.boolean()
  ),
});
