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

export default function Filter() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-50px h-full">
      <Button
        className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
        size="md"
        onPress={onOpen}
        radius="full"
      >
        Filter
      </Button>
      <Drawer isOpen={isOpen} placement={"left"} className="w-full h-full" onOpenChange={onOpenChange}>
        <DrawerContent className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 border-b border-purple-200">
                <h2 className="text-2xl font-bold text-purple-900">
                  Filter Events
                </h2>
                <p className="text-sm text-purple-600">Choose your filters</p>
              </DrawerHeader>
              <DrawerBody className="p-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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
