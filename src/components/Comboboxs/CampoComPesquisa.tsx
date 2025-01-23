import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";

interface CampoComPesquisaProps {
    items: string[];
    placeholder: string;
    selectedValue?: string | undefined;
    onSelect: (value: string) => void;
}

export default function CampoComPesquisa({ items, placeholder, selectedValue, onSelect }: CampoComPesquisaProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<string | undefined>(selectedValue);

    const filterItems = items.filter((item) => {
        if(!search) return true;
        return item.toLowerCase().includes(search.toLowerCase());
    });

    function handleSelect(currentValue: string) {
        setSelectedItem(currentValue);
        setSearch(currentValue);
        onSelect(currentValue);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-controls="combobox-options"
                    className="w-full justify-between h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                >
                    {selectedItem || search ||placeholder}
                
                <Calendar className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" id="combobox-options">
                <Command>
                    <CommandInput 
                        placeholder={placeholder}
                        value={search}
                        onValueChange={setSearch}
                        
                    />
                    <CommandEmpty>Não encontrado</CommandEmpty>
                    <CommandGroup className="h-64 overflow-y-auto">
                        {filterItems.map((item) => (
                            <CommandItem
                                key={item}
                                value={item}
                                onSelect={() => handleSelect(item)}
                                className="cursor-pointer"
                            >
                                {item}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}