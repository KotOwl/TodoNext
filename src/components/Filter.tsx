"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import DataPicker from "./DataPicker";
import NameFilter from "./NameFilter";
import { EventType } from "@/types/IEvents";
import TypeButtons from "./TypeButtons";

export default function Filter() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex aitems-center w-full h-full gap-4">
      <Button
        className="bg-gradient-to-r rounded-full from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="md"
        onPress={onOpen}
        radius="full"
      >
        🔍 Filter Events
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={"left"}
        className="absolute w-full h-full top-0 left-0 bg-purple-50"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-purple-800">
                  Event Filters
                </h2>
                <DataPicker />
                <p className="text-sm text-purple-600">
                  Choose dates and other parameters
                </p>
              </DrawerHeader>
              <DrawerBody className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">
                    Search by Name
                  </h3>
                  <NameFilter />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">
                    Event Type
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(EventType).map((type: EventType) => (
                      <TypeButtons key={type} type={type} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">
                    Status
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      className="border-purple-300 text-purple-600"
                    >
                      Active
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="border-purple-300 text-purple-600"
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="border-t border-purple-200 gap-2">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="border border-red-300"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                  onPress={onClose}
                >
                  Apply Filters
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
