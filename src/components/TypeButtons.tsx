import { Button } from "@heroui/react";
import { EventType, EventTypeLabel } from "@/types/IEvents";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type TypeButtonsProps = {
  type: EventType;
};

const TypeButtons: FC<TypeButtonsProps> = ({ type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentType = searchParams.get("type");
  const isActive = currentType === type;

  const handleSubmit = (type: EventType) => {
    if (isActive) {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    router.replace(`/events?${params.toString()}`, { scroll: false });
  };

  return (
    <Button
      size="sm"
      variant={isActive ? "solid" : "bordered"}
      className={
        isActive
          ? "bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200"
          : "border-purple-300 text-purple-600 hover:bg-purple-100 hover:border-purple-400 transition-all duration-200"
      }
      onPress={() => handleSubmit(type)}
    >
      {EventTypeLabel[type]}
    </Button>
  );
};

export default TypeButtons;
