import { IEventRead } from "@/types/IEvents";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { FC } from "react";

type EventCardProps = {
  event: IEventRead;
};

const EventCard: FC<EventCardProps> = ({ event }) => {
  let displayDateTime = "";

  if (event.eventDate && typeof event.eventDate.toDate === "function") {
    const jsDate = event.eventDate.toDate();

    displayDateTime = jsDate.toLocaleString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <Card className="py-4 bg-purple-50 border border-purple-300 text-center">
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-center">
        <p className="text-tiny uppercase font-bold text-purple-900">
          {event.title}
        </p>
        <small className="text-purple-700">{displayDateTime}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large text-purple-900">
          {event.description}
        </h4>
      </CardBody>
    </Card>
  );
};

export default EventCard;
