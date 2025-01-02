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
  const [value, setValue] = useState(selectedValue?.id || "");

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue.id);
    }
  }, [selectedValue]);

  const handleSelect = (item: T) => {
    setValue(item.id);
    setOpen(false);
    
    if (isPessoa(item)) {
      onSelect(item as T);
    } else if (isBebida(item)) {
      onSelect(item as T);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
        >
          {value
            ? items.find((item) => item.id === value)?.nome
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => handleSelect(item)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
