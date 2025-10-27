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
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Create New Event
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-800 mb-2">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Enter event title"
              {...register("title")}
              className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900 placeholder:text-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-800 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter event description"
              {...register("description")}
              rows={4}
              className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900 placeholder:text-purple-400 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-purple-800 mb-2">
                Date
              </label>
              <input
                type="date"
                placeholder="Select date"
                {...register("date")}
                className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-800 mb-2">
                Time
              </label>
              <input
                type="time"
                placeholder="Select time"
                {...register("time")}
                className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-purple-900"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewEventPage;
