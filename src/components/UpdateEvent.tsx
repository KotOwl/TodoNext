import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { IEventRead, EventType, EventTypeLabel } from "@/types/IEvents";
import { useState } from "react";
import { useFirebase } from "@/services/database/FirebaseContext";

export default function UpdateEvent({ event }: { event: IEventRead }) {
  const { updateEvent } = useFirebase();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    eventDate: event.eventDate.includes("T")
      ? event.eventDate
      : `${event.eventDate}T00:00`,
    type: event.type,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      eventDate: formData.eventDate.split("T")[0],
    };
    updateEvent(event.id, dataToSave);
    onOpenChange();
  };

  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        className="border-blue-300 text-blue-600 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200"
        onPress={onOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-4 h-4"
          fill="currentColor"
        >
          <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" />
        </svg>
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-purple-800">
                  Edit Event
                </h2>
                <p className="text-sm text-purple-600">Update event details</p>
              </ModalHeader>
              <ModalBody className="space-y-4">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-purple-700">
                      Event Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter event title"
                      variant="bordered"
                      className="border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-200"
                      color="secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-purple-700">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Enter event description"
                      variant="bordered"
                      className="border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-200"
                      color="secondary"
                      minRows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-purple-700">
                      Date & Time
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.eventDate}
                      onChange={(e) =>
                        handleInputChange("eventDate", e.target.value)
                      }
                      variant="bordered"
                      className="border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-200"
                      color="secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-purple-700">
                      Type
                    </label>
                    <Select
                      selectedKeys={[formData.type]}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as EventType;
                        handleInputChange("type", selectedKey);
                      }}
                      variant="bordered"
                      className="border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-200"
                      color="secondary"
                      placeholder="Select event type"
                      aria-label="Event type selection"
                    >
                      {Object.values(EventType).map((type) => (
                        <SelectItem key={type} textValue={EventTypeLabel[type]}>
                          {EventTypeLabel[type]}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="gap-2">
                <Button
                  color="danger"
                  variant="light"
                  className="border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  onPress={handleSave}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
