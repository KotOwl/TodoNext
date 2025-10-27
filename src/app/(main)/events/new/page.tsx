"use client";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/contexts/FirebaseContext";
import { useRouter } from "next/navigation";
import { IEventCreate } from "@/types/IEvents";

function NewEventPage() {
    const { register, handleSubmit } = useForm<IEventCreate>();
    const { createEvent } = useFirebase();
    const router = useRouter();
    const onSubmit = async (data: IEventCreate) => {
        await createEvent(data);
        router.push("/events");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 caret-amber-500">
            <input type="text" placeholder="Title" {...register("title")} className="p-2 rounded-md border border-gray-300" />
            <input type="text" placeholder="Description" {...register("description")} className="p-2 rounded-md border border-gray-300" />
            <input type="date" placeholder="Date" {...register("date")} className="p-2 rounded-md border border-gray-300" />
            <input type="time" placeholder="Time" {...register("time")} className="p-2 rounded-md border border-gray-300" />
            <button type="submit" className="p-2 rounded-md border border-gray-300">Create</button>
        </form>
    );
}

export default NewEventPage;