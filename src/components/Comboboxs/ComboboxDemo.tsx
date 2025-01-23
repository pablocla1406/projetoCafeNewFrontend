import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  nome: string;
};

type ComboboxDemoProps = {
  items: Item[];
  onSelect: (item: Item) => void;
  onCreate: (item: Item) => void;
  selectedValue?: Item;
  placeholder: string;
};

export function ComboboxDemo({
  items,
  onSelect,
  onCreate,
  selectedValue,
  placeholder,
}: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedValue) {
      setSelectedItem(selectedValue);
      setSearch(selectedValue.nome);
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
          {selectedItem?.nome || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <p className="mb-2">Nenhum Cadastro Encontrado.</p>
              <Button
                onClick={() => {
                  if (search.trim()) {
                    const newItem = { nome: search.trim() } as Item;
                    onCreate(newItem);
                    setSearch("");
                    setOpen(false);
                  }
                }}
                className="w-full"
                variant="secondary"
              >
                Criar novo
              </Button>
            </CommandEmpty>
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