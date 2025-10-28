"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/services/database/FirebaseContext";
import { useRouter } from "next/navigation";
type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { signIn } = useFirebase();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    await signIn(data.email, data.password);
    router.push("/events");
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
            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>
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
