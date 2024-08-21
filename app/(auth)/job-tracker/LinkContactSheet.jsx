"use client";

import CrossButton from "@/app/components/ui/cross-button";
import { UserAvatar } from "@/app/components/ui/user-avatar";
import { IoMdLink } from "react-icons/io";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";

function DynamicLinkButton({ btnType, onClickHandler, linkBtnClassName }) {
  return btnType === "link" ? (
    <Button
      onClick={onClickHandler}
      className={cn(
        "flex h-5 w-fit items-center justify-center gap-1 self-end p-2 text-xs text-white hover:bg-success/80 dark:text-black dark:hover:bg-success/80 dark:hover:text-white",
        linkBtnClassName,
      )}
    >
      Link
      <IoMdLink className="h-4 w-4" />
    </Button>
  ) : (
    <Button
      onClick={onClickHandler}
      className="flex h-5 w-fit items-center justify-center gap-1 self-end bg-error p-2 text-xs text-white hover:bg-error/80 dark:bg-error dark:text-white dark:hover:bg-error/80"
    >
      Unlink
      <IoMdLink className="h-4 w-4" />
    </Button>
  );
}

// Link contact form sheet, params from main page jobs component
function LinkContactSheet({
  contacts,
  linkContactHandler,
  unlinkContactHandler,
  linkedContact,
}) {
  const [selectedContact, setSelectedContact] = useState();

  useEffect(() => {
    if (linkedContact) {
      console.log(linkedContact);
      setSelectedContact({
        _id: linkedContact._id,
        fullName: linkedContact.fullName,
        company: linkedContact.company,
        email: linkedContact.email,
        number: linkedContact.phoneNumber.number,
      });
    }
  }, [linkedContact]);

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

      {selectedContact && (
        <div className="flex flex-col gap-4 rounded-md bg-forminput p-3 dark:bg-forminput/10">
          <p className="text-sm font-bold text-darkgrey dark:text-forminput/70">
            Contact Details
          </p>
          <div className="flex items-center gap-5 px-2">
            <div className="flex flex-col justify-center gap-2 text-xs font-bold dark:text-white">
              <p>Name</p>
              <p>Company</p>
              <p>Email</p>
              <p>Phone number</p>
            </div>
            <div className="flex h-full flex-col gap-2 text-xs text-darkgrey dark:text-forminput/70">
              <p>{selectedContact.fullName}</p>
              <p>{selectedContact.company}</p>
              {/* Setting the min height to 1 rem(16px) i.e. the line height for text-xs if no text is present */}
              <p className="min-h-4">{selectedContact.email}</p>
              <p>{selectedContact.number}</p>
            </div>
          </div>
          {linkedContact && linkedContact._id === selectedContact._id ? (
            <DynamicLinkButton
              btnType="unlink"
              onClickHandler={() => unlinkContactHandler()}
            />
          ) : (
            <DynamicLinkButton
              btnType="link"
              onClickHandler={() => linkContactHandler(selectedContact)}
              linkBtnClassName="bg-success dark:bg-success dark:text-white"
            />
          )}
        </div>
      )}

      <Command className="gap-2 dark:bg-transparent">
        <CommandInput
          placeholder="Search"
          wrapperClassName="bg-forminput dark:bg-forminput/10 border-none rounded-md"
          className="h-9 bg-transparent"
        />
        <ScrollArea>
          <CommandList className="max-h-fit rounded-md bg-forminput dark:bg-forminput/10">
            <CommandEmpty>No contacts found.</CommandEmpty>
            <CommandGroup>
              {contacts.map((contact, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => setSelectedContact(contact)}
                >
                  <div className="flex w-full items-center justify-between p-2">
                    <div className="flex items-center gap-4">
                      <UserAvatar
                        className="h-8 w-8 text-xs"
                        avatarFallbackClassName="text-white bg-slate-800 dark:text-black dark:bg-primary-light"
                        name={{
                          fname: contact.fullName.split(" ")[0],
                          lname: contact.fullName.split(" ")[1],
                        }}
                      />

                      <div className="flex w-full flex-col flex-wrap justify-between">
                        <div className="text-sm font-semibold dark:text-white">
                          <span>{contact.fullName}</span>
                        </div>
                        <div className="break-all text-xs text-grey dark:text-forminput/70">
                          {contact.company}
                        </div>
                      </div>
                    </div>

                    {linkedContact && linkedContact._id === contact._id ? (
                      <DynamicLinkButton
                        btnType="unlink"
                        onClickHandler={() => unlinkContactHandler()}
                      />
                    ) : (
                      <DynamicLinkButton
                        btnType="link"
                        onClickHandler={() => linkContactHandler(contact)}
                      />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </ScrollArea>

        <Button className="bg-primary hover:bg-primary/80 dark:bg-primary dark:text-white dark:hover:bg-primary/80">
          New Contact
        </Button>
      </Command>
    </>
  );
}

export default LinkContactSheet;
