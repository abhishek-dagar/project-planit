import {
  UserRegisterValidation,
  UserSignInValidation,
} from "@/lib/types/user.types";
import axios from "axios";
import { z } from "zod";

const apiRoutes = {
  signin: "/api/user/signin",
  signup: "/api/user/signup",
};

export const userSignUp = async ({
  email,
  password,
}: z.infer<typeof UserRegisterValidation>) => {
  try {
    const response = await axios.post(apiRoutes.signup, {
      email,
      password,
    });
    if (response.data.success) {
      return { response: response.data.message };
    }
    return { err: "Failed to sign up" };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const userSignIn = async ({
  email,
  password,
}: z.infer<typeof UserSignInValidation>) => {
  try {
    const response = await axios.post(apiRoutes.signin, {
      email,
      password,
    });
    if (response.data.success) {
      return { response: response.data.message };
    }
    return { err: "Failed to sign in" };
  } catch (error: any) {
    return { err: error.message };
  }
};

export const userSignOut = async () => {
  try {
    const response = await axios.get("/api/user/logout");
    if (response.data.success) {
      return { response: response.data.message };
    }
    return { err: "Failed to sign out" };
  } catch (error: any) {
    return { err: error.message };
  }
};
