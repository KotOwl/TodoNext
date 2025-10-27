"use client";
import { useEffect, useState } from "react";
import EventCard from "../../../components/EventCard";
import { IEventRead } from "@/types/IEvents";
import { useFirebase } from "@/contexts/FirebaseContext";
import Filter from "@/components/Filter";
function EventsPage() {
  const { getEvents } = useFirebase();
  const [events, setEvents] = useState<IEventRead[]>([]);

  useEffect(() => {
    getEvents().then((events) => {
      setEvents(events);
      console.log(events);
    });
  }, [getEvents]);

  return (
    <div className="flex justify-center w-full h-full flex-start pt-5 pl-5">
      <Filter />

      <div className="flex flex-col flex-wrap gap-20 w-full h-full items-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
