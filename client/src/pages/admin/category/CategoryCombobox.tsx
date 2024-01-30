import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types/main-types";
import { getCategories } from "@/services/categoryService";
import ReactPaginate from "react-paginate";

interface Props {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryCombobox = ({ category, setCategory }: Props) => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [nextPage, setNextPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories(nextPage, 8, "desc");
        setTotalPages(data?.totalPages);
        setCategories(data?.docs);
      } catch (error) {
        setCategories([]);
        setTotalPages(1);
      }
    }
    fetchData();
  }, [nextPage]);

  // CLICK PAGE
  const handlePageClick = (event: { selected: number }) => {
    setNextPage(event.selected + 1);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-gray-400 capitalize text-sm"
        >
          {category
            ? categories?.find((item) => item.name === category)?.name
            : "Choose category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 w-[600px] overflow-y-auto`}>
        <Command>
          <CommandInput placeholder="Find category..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {categories.map((item) => {
              return (
                <CommandItem
                  key={item._id}
                  value={item.name}
                  className="capitalize"
                  onSelect={(currentValue) => {
                    setCategory(currentValue === category ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>

        <div className="flex justify-end p-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronRight />}
            onPageChange={handlePageClick}
            pageCount={totalPages}
            previousLabel={<ChevronLeft />}
            renderOnZeroPageCount={null}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCombobox;
