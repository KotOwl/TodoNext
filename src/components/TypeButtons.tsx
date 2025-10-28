import { Button } from "@heroui/react";
import { EventType, EventTypeLabel } from "@/types/IEvents";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type TypeButtonsProps = {
    type: EventType;
}

const TypeButtons: FC<TypeButtonsProps> = ({ type }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
const params = new URLSearchParams(searchParams)
const handleSubmit = (type: EventType) =>{
    params.set("type",(type.replace(" ", "_").toLowerCase()))
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <Button onPress={() => handleSubmit(type)}>{EventTypeLabel[type]}</Button>;
};

export default TypeButtons;