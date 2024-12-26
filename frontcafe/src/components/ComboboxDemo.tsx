import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CommandInput } from "cmdk";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/command";
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
  const [value, setValue] = useState("")
  const [inputValue, setInputValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.id === value)?.nome
            : "Procure a função"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Procure a Função"
            className="h-9"
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue) {
                const newItem = { id: inputValue, nome: inputValue };
                onCreate(newItem);
                setValue(inputValue);
                setOpen(false);
              }
            }}
          />
          <CommandList>
            <CommandEmpty>Nenhuma função encontrada. Pressione Enter para criar.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue: string) => {
                    const selectedItem = items.find(f => f.id === currentValue);
                    if (selectedItem) {
                      setValue(currentValue === value ? "" : currentValue)
                      onSelect(selectedItem);
                    } else {
                      const newItem = { id: currentValue, nome: currentValue };
                      onCreate(newItem);
                      setValue(currentValue);
                    }
                    setOpen(false)
                  }}
                >
                  {item.nome}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
