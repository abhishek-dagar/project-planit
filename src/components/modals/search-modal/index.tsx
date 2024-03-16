import useUser from "@/components/custom-hooks/user";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { searchMenu } from "@/lib/config/search.config";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  open: boolean;
  setOpen: (a: any) => void;
}

const SearchModal = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [user] = useUser({});
  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="top-[28%]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandSeparator />
        {searchMenu.map((group) => (
          <CommandGroup key={group.name} heading={group.name}>
            {group.group.map((menu) => {
              if (
                menu.name === "Tasks" &&
                user?.role.toLowerCase() === "manager"
              )
                return;
              if (
                menu.name === "Teams" &&
                user?.role.toLowerCase() !== "manager"
              )
                return;
              return (
                <CommandItem
                  key={menu.name}
                  onSelect={() => {
                    setOpen(false);
                    router.push(menu.link);
                  }}
                  value={menu.name}
                >
                  <menu.icon className="mr-2 h-4 w-4" />
                  <span>{menu.name}</span>
                  <CommandShortcut>
                    <kbd>{menu.sortCutKey}</kbd>
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchModal;
