"use server";

import { signIn } from "@/auth";
import { customHash, generateSalt } from "../hash";
import prisma from "../prisma";
import { LoginSchema, LoginType } from "../schemas/login";
import { SignupSchema, SignupType } from "../schemas/signup";
import { AuthError } from "next-auth";

interface AuthActionReturn {
  success: boolean;
  error?: string;
  message?: string;
}

export async function signupAction(
  formData: SignupType
): Promise<AuthActionReturn> {
  const signupFields = SignupSchema.safeParse(formData);

  if (!signupFields.success) {
    return {
      success: false,
      error: "One or more invalid fields provided!",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: signupFields.data.email },
    });

    if (user) {
      return {
        success: false,
        error: "User with this email already exists!",
      };
    }

    const salt = generateSalt();
    const passwordHash = customHash(signupFields.data.password, salt);

    await prisma.user.create({
      data: {
        ...signupFields.data,
        password: passwordHash,
        salt: salt,
      },
    });

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function LoginAction(
  formData: LoginType
): Promise<AuthActionReturn> {
  const loginFields = LoginSchema.safeParse(formData);

  if (!loginFields.success) {
    return {
      success: false,
      error: "Invalid credentials!",
    };
  }

  try {
    await signIn("credentials", {
      email: loginFields.data.email,
      password: loginFields.data.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Logged in successfully!",
    };
  } catch (error) {
    console.error(error);

    if(error instanceof AuthError) {
        return {
            success: false,
            error: error.message,
        }
    }
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
