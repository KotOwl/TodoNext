"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/contexts/FirebaseContext";
import { useRouter } from "next/navigation";
type FormData = {
    email: string;
    password: string;
};

export default function RegisterPage() {
    const { register, handleSubmit } = useForm<FormData>();
    const { signUp } = useFirebase();
    const router = useRouter();
    const onSubmit = async (data: FormData) => {
        await signUp(data.email, data.password);
        router.push("/")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" {...register("email")} />
                <input type="password" {...register("password")} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}