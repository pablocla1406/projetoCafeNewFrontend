import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
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
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  useEffect(() => {
    if (selectedValue) {
      console.log("ComboboxDemo received selectedValue:", selectedValue);
      // If we have a selectedValue with just the nome, find the matching item
      if (selectedValue.nome) {
        const matchingItem = items.find(item => 
          item.nome.toLowerCase() === selectedValue.nome.toLowerCase()
        );
        if (matchingItem) {
          console.log("Found matching item:", matchingItem);
          setSelectedItem(matchingItem);
          setInputValue(matchingItem.nome);
        } else {
          console.log("No matching item found, using selectedValue:", selectedValue);
          setSelectedItem(selectedValue);
          setInputValue(selectedValue.nome);
        }
      }
    }
  }, [selectedValue, items])

  const handleSelect = (item: Item) => {
    console.log("ComboboxDemo handleSelect:", item);
    setSelectedItem(item);
    setInputValue(item.nome);
    onSelect(item);
    setOpen(false);
  }

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
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value)
              const filtered = items.filter(item => 
                item.nome.toLowerCase().includes(value.toLowerCase())
              )
              setFilteredItems(filtered)
            }}
          />
          <CommandList>
            <CommandEmpty>
              <p className="mb-2">Nenhum Cadastro Encontrado.</p>
              <Button
                onClick={() => {
                  if (inputValue.trim()) {
                    const newItem = { nome: inputValue.trim() } as Item;
                    onCreate(newItem);
                    setInputValue("");
                    setOpen(false);
                  }
                }}
                className="w-full"
                variant="secondary"
              >
                Criar Cadastro: {inputValue}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item)}
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
  )
}