import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import IPessoa from "@/utils/interfaces/IPessoa";
import IBebida from "@/utils/interfaces/IBebida";

// Helper type guard functions
function isPessoa(item: IPessoa | IBebida): item is IPessoa {
  return 'foto' in item && 'permissao' in item;
}

function isBebida(item: IPessoa | IBebida): item is IBebida {
  return 'descricao' in item && 'preco' in item;
}

type ComboboxReadOnlyProps<T extends IPessoa | IBebida> = {
  items: T[];
  onSelect: (item: T) => void;
  selectedValue?: T;
  placeholder: string;
};

export function ComboboxReadOnly<T extends IPessoa | IBebida>({
  items,
  onSelect,
  selectedValue,
  placeholder,
}: ComboboxReadOnlyProps<T>) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (selectedValue) {
      setSelectedItem(selectedValue);
      setInputValue(selectedValue.nome);
    }
  }, [selectedValue]);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setInputValue(item.nome);
    onSelect(item);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-11 px-3 py-2  border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
        >
          {selectedItem?.nome || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-50">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value);
              const filtered = items.filter((item) =>
                item.nome.toLowerCase().includes(value.toLowerCase())
              );
              setFilteredItems(filtered);
            }}
          />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
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
