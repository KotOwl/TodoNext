"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/services/database/FirebaseContext";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useState } from "react";
type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { signIn, signInWithGoogle, signInWithGitHub } = useFirebase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      router.push("/events");
    } catch (error) {
      console.error("Login error:", error);
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
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            {isLoading ? "Loading..." : "Login"}
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
              startContent={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.77-.07-1.5-.2-2.18H12v4.15h5.82c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.05z"
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
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              onPress={handleGitHubSignIn}
              disabled={isLoading}
              className="bg-gray-900 text-white hover:bg-gray-800 font-semibold"
              startContent={
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.贪婪.103-.253-.453-.506-.87-.506-.87-.414-1.18.101-1.18.101.328.111.562.253.688.253.688 1.563 1.089 2.46.829.072-.645.28-1.085.51-1.335-1.78-.203-3.649-.89-3.649-3.964 0-.877.31-1.593.82-2.153-.082-.203-.36-1.02.077-2.125 0 0 .67-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.365.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.106.164 1.922.082 2.125.51.56.82 1.276.82 2.153 0 3.085-1.87 3.758-3.65 3.956.287.248.543.735.543 1.481 0 1.069-.01 1.931-.01 2.193 0 .268.18.58.688.482 3.969-1.322 6.833-5.079 6.833-9.5C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Continue with GitHub
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-purple-600">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-purple-800 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
