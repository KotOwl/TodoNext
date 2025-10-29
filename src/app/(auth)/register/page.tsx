"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/services/database/FirebaseContext";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useState } from "react";
type FormData = {
  email: string;
  password: string;
  displayName: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { signUp, signInWithGoogle, signInWithGitHub } = useFirebase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.displayName);
      router.push("/events");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push("/events");
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGitHub();
      router.push("/events");
    } catch (error) {
      console.error("GitHub sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-800 mb-2">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("displayName")}
              className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900 placeholder:text-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-800 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900 placeholder:text-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-800 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900 placeholder:text-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-purple-300"></div>
            <span className="flex-shrink mx-4 text-purple-600 text-sm">or</span>
            <div className="flex-grow border-t border-purple-300"></div>
          </div>

          <div className="mt-4 space-y-3">
            <Button
              fullWidth
              onPress={handleGoogleSignIn}
              disabled={isLoading}
              className="bg-white text-gray-700 border-2 border-purple-200 hover:bg-purple-50 font-semibold"
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              onPress={handleGitHubSignIn}
              disabled={isLoading}
              className="bg-gray-900 text-white hover:bg-gray-800 font-semibold"
            >
              Continue with GitHub
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-purple-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-800 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
