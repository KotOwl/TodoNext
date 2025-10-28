import { EventTypeColor, EventTypeLabel, IEventRead } from "@/types/IEvents";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { FC } from "react";
import CompleteButton from "./CompleteButton";
import UpdateEvent from "./UpdateEvent";

type EventCardProps = {
  event: IEventRead;
};

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="py-4 rounded-xl bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 min-h-50 max-h-100 min-w-75 max-w-100 flex flex-col justify-between">
      <CardHeader className="flex ps-6 pe-6 justify-between items-center w-full border-b border-purple-200">
        <p className="text-sm uppercase font-bold text-purple-800 tracking-wide">
          {event.title}
        </p>
        <UpdateEvent event={event} />
      </CardHeader>
      <CardBody className="py-2 max-w-75 justify-center items-center">
        <p className="font-semibold w-9/10 text-base text-purple-900 break-words whitespace-pre-wrap overflow-hidden">
          {event.description}
        </p>
        <p className={`text-sm self-end ${EventTypeColor[event.type]}`}>
          {EventTypeLabel[event.type]}
        </p>
      </CardBody>
      <CardFooter className="text-xs flex justify-between w-full pe-3 border-t border-purple-100 pt-2 mt-2">
        <small className="text-purple-600 text-start font-medium">
          {event.eventDate}
        </small>
        <CompleteButton event={event} />
      </CardFooter>
    </Card>
  );
};

export default EventCard;
