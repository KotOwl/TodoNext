"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/contexts/FirebaseContext";
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
    router.push("/")
   };

   return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email")} />
            <input type="password" {...register("password")} />
            <button type="submit">Login</button>
      </form>
    </div>
  );
}