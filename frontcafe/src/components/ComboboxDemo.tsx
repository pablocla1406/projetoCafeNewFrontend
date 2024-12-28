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
};

export function ComboboxDemo({ items, onSelect, onCreate }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    const filtered = items.filter(item => 
      item.nome.toLowerCase().includes(newValue.toLowerCase())
    )
    setFilteredItems(filtered)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedItem ? selectedItem.nome : "Selecione o setor"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Procure o Setor"
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty className="p-4">
              <p className="mb-2">Nenhum Setor encontrado.</p>
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
                Criar Setor: {inputValue}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    setSelectedItem(item);
                    onSelect(item);
                    setOpen(false);
                  }}
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