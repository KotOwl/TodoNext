import { useFirebase } from "@/services/database/FirebaseContext";
import { IEventRead } from "@/types/IEvents";
import { Button } from "@heroui/react";

export default function CompleteButton({ event }: { event: IEventRead }) {
  const { completeEvent } = useFirebase();
  const handleComplete = () => {
    completeEvent(event.id);
  };
  return (
    <Button
      size="sm"
      variant={event.status === "Completed" ? "solid" : "bordered"}
      color={event.status === "Completed" ? "success" : "primary"}
      className={
        event.status === "Completed"
          ? "bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
          : "border-purple-300 text-purple-600 hover:bg-purple-100 hover:border-purple-400 transition-all duration-200"
      }
      isDisabled={event.status === "Completed"}
      onPress={handleComplete}
    >
      {event.status === "Active" ? "✓ Complete" : "✓ Completed"}
    </Button>
  );
}
