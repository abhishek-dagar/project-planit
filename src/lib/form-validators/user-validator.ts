import * as z from "zod";

export const UserRegisterValidation = z
  .object({
    email: z.string().email().nonempty(),
    username: z.string().min(3).max(30),
    password: z.string().min(8).max(1000),
    confirmPassword: z.string().min(8).max(1000),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
      
      if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path:["confirmPassword"],
      });
    }
  });
export const UserLoginValidation = z.object({
  emailOrUsername: z
    .string()
    .min(3, { message: "Please enter a valid username or email" })
    .max(30),
  password: z.string(),
});

export const UserUpdatePasswordValidation = z
  .object({
    oldPassword: z.string().min(8).max(1000),
    newPassword: z.string().min(8).max(1000),
    confirmPassword: z.string().min(8).max(1000),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
      
      if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match with new password",
        path:["confirmPassword"],
      });
    }
  });