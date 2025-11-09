"use client";

import React, { useState } from "react";
import { Mail, Lock, Github, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "@/app/(marketing)/_components/Navbar";
import Footer from "@/app/(marketing)/_components/Footer";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

// Validation schemas
const signInSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signUpSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and a number"
    )
    .required("Password is required"),
});

type FormData = yup.InferType<typeof signInSchema>;

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = isSignUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        option: "manual",
      });

      if (response?.status === 200) {
        window.location.href = "/auth";
      } else {
        console.log(response?.error);
        toast.error(response?.error);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    await signIn("google",{ callbackUrl: "/auth" });
  };

  const githubLogin = async () => {
    const response = await signIn("google");
    if (response?.status === 200) {
      window.location.href = "/auth";
    } else {
      console.log(response?.error);
      toast.error(response?.error);
    }
  };

  // Reset form on toggle
  //   React.useEffect(() => {
  //     reset();
  //   }, [isSignUp, reset]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              Sign-in/Sign-up to Notion
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
              Start organizing your thoughts, beautifully.
            </p>
          </div>

          <div className="md:bg-white dark:md:bg-gray-800 rounded-xl md:shadow-lg p-0 md:p-8 transition-all outline-none">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className={`
                      block w-full pl-10 pr-3 py-3.5 border rounded-lg
                      placeholder-gray-400 dark:placeholder-gray-500
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     
                      transition-all sm:text-sm
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }
                    `}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    className={`
                      block w-full pl-10 pr-3 py-3.5 border rounded-lg
                      placeholder-gray-400 dark:placeholder-gray-500
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     
                      transition-all sm:text-sm
                      ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }
                    `}
                    placeholder={
                      isSignUp ? "Choose a strong password" : "Your password"
                    }
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className={`
                  w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg
                  text-sm font-medium text-white
                  transition-all duration-200
                  ${
                    isLoading || !isValid
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  }
                `}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : isSignUp ? (
                  "Sign up"
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white  text-gray-500 dark:text-gray-400 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                onClick={googleLogin}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.75c1.63 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                onClick={githubLogin}
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </div>

          {/* Legal */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
            By continuing, you agree to Notion’s{" "}
            <a
              href="#"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
