import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface Props {
  value?: string;
  setValue?: (value: string) => void;
  data: string[];
  placeHolder?: string;
  className?: string;
}

const ComboboxRoot = ({
  data = [],
  value,
  setValue = () => {},
  placeHolder = "Choose category...",
  className = "",
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-gray-400 capitalize text-sm"
        >
          {value ? data.find((category) => category === value) : placeHolder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${className} p-0 `}>
        <Command>
          <CommandInput placeholder={placeHolder} />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {data.map((category) => {
              return (
                <CommandItem
                  key={category}
                  value={category}
                  className="capitalize"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxRoot;
