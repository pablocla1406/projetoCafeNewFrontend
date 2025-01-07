import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import IPessoa from "@/utils/interfaces/IPessoa";
import IBebida from "@/utils/interfaces/IBebida";


type ComboboxReadOnlyProps<T extends IPessoa | IBebida> = {
  items: T[];
  onSelect: (item: T) => void;
  selectedValue?: T | undefined;
  placeholder: string;
};

export function ComboboxReadOnly<T extends IPessoa | IBebida>({
  items,
  onSelect,
  selectedValue,
  placeholder,
}: ComboboxReadOnlyProps<T>) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selectedValue);
  const [inputValue, setInputValue] = useState(selectedValue?.nome || "");
  const [filteredItems, setFilteredItems] = useState(items);

  // Atualiza a lista filtrada sempre que os itens ou inputValue mudam
  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.nome.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, items]);

  // Sincroniza selectedValue com selectedItem e inputValue ao receber props
  useEffect(() => {
    if (selectedValue) {
      setSelectedItem(selectedValue);
      setInputValue(selectedValue.nome || "");
    }
  }, [selectedValue]);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setInputValue(item.nome);
    onSelect(item); // Propaga o item selecionado para o componente pai
    setOpen(false); // Fecha o Popover
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
          {selectedItem?.nome || inputValue || placeholder} {/* Fallback para exibição */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-50">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(value) => setInputValue(value)}
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
