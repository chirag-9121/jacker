"use client";

import CrossButton from "@/app/components/ui/cross-button";

// Shadcn ui components
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { useState } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";

// Add/ Edit contact form sheet, params from custom hook and row actions
function LinkContactSheet() {
  const [contact, setContact] = useState([
    {
      id: "1",
      value: "John",
    },
    {
      id: "2",
      value: "Jane",
    },
    {
      id: "3",
      value: "Joe",
    },
    {
      id: "4",
      value: "John",
    },
    {
      id: "5",
      value: "Jane",
    },
    {
      id: "6",
      value: "Joe",
    },
    {
      id: "7",
      value: "John",
    },
    {
      id: "8",
      value: "Jane",
    },
    {
      id: "9",
      value: "Joe",
    },
    {
      id: "10",
      value: "John",
    },
    {
      id: "11",
      value: "Jane",
    },
    {
      id: "12",
      value: "Joe",
    },
  ]);
  return (
    <>
      {/* Sheet Header with title and close button */}
      <SheetHeader className="flex-row items-center justify-between">
        <SheetTitle>Link or add new</SheetTitle>
        <SheetDescription />
        <SheetTrigger>
          <CrossButton />
        </SheetTrigger>
      </SheetHeader>

      <div className="flex flex-col gap-4 rounded-md bg-forminput p-3">
        <p className="text-sm font-bold text-darkgrey">Contact Details</p>
        <div className="flex items-center gap-5 px-2">
          <div className="flex flex-col justify-center gap-2 text-xs font-bold">
            <p>Name</p>
            <p>Company</p>
            <p>Email</p>
            <p>Phone number</p>
          </div>
          <div className="flex flex-col justify-center gap-2 text-xs text-darkgrey">
            <p>John Doe</p>
            <p>Google</p>
            <p>johndoe@gmail.com</p>
            <p>+353 899709976</p>
          </div>
        </div>
        <Button className="h-5 w-fit self-end bg-error text-xs text-white">
          Unlink
        </Button>
      </div>

      <Command className="gap-2">
        <CommandInput
          placeholder="Search"
          wrapperClassName="bg-forminput border-none rounded-md"
          className="h-9 bg-forminput"
        />
        <ScrollArea>
          <CommandList className="max-h-fit rounded-md bg-forminput">
            <CommandEmpty>No contacts found.</CommandEmpty>
            <CommandGroup>
              {contact.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={contact.value}
                  // onSelect={(currentValue) => {
                  //   setValue(currentValue === value ? "" : currentValue);
                  // }}
                >
                  {contact.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </ScrollArea>

        <Button className="bg-primary">New Contact</Button>
      </Command>
    </>
  );
}

export default LinkContactSheet;
