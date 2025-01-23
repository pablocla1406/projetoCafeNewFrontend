import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import IPessoadoPedido from "@/utils/interfaces/IPessoadoPedido";
import IBebidadoPedido from "@/utils/interfaces/IBebidadoPedido";

type ComboboxReadOnlyProps<T extends IPessoadoPedido | IBebidadoPedido> = {
  items: T[];
  onSelect: (item: T) => void;
  selectedValue?: T | undefined;
  placeholder: string;
};

export function ComboboxReadOnly<T extends IPessoadoPedido | IBebidadoPedido>({
  items,
  onSelect,
  selectedValue,
  placeholder,
}: ComboboxReadOnlyProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selectedValue);

  useEffect(() => {
    if (selectedValue) {
      setSelectedItem(selectedValue);
      setSearch(selectedValue.nome || "");
    }
  }, [selectedValue]);

  const filteredItems = items.filter((item) => {
    if (!search) return true;
    return item.nome.toLowerCase().includes(search.toLowerCase());
  });

  const handleSelect = (currentValue: string) => {
    const selected = items.find((item) => item.nome.toLowerCase() === currentValue.toLowerCase());
    if (selected) {
      setSelectedItem(selected);
      setSearch(selected.nome);
      onSelect(selected);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
        >
          {selectedItem?.nome || search || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-50">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.nome}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem?.id === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
