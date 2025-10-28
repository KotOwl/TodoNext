"use client";
import { useEffect, useState } from "react";
import EventCard from "../../../components/EventCard";
import { IEventRead } from "@/types/IEvents";
import { useFirebase } from "@/services/database/FirebaseContext";
import Filter from "@/components/Filter";
import { useSearchParams } from "next/navigation";
function EventsPage() {
  const { getEvents } = useFirebase();
  const [events, setEvents] = useState<IEventRead[]>([]);
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const type = searchParams.get("type");
  const title = searchParams.get("title");
  console.log("URL params:", { startDate, endDate, type, title });

  useEffect(() => {
    const filters = {
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      type: type ? type : undefined,
      title: title ? title : undefined,
    };

    console.log("Calling getEvents with filters:", filters);

    getEvents(filters)
      .then((events) => {
        console.log("Received events:", events);
        setEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [getEvents, startDate, endDate, type, title]);

  return (
    <div className="w-full p-8 flex justify-center items-center flex-col gap-4">
      <div className="flex w-full h-full items-center justify-between mb-8">
        <Filter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-purple-600">No events found</p>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
