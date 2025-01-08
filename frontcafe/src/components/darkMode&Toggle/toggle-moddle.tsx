import { Moon, Sun } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme, type Theme } from "@/components/darkMode&Toggle/themeprovider"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
    tempConfig: {
        theme: Theme;
        font: string;
    };
    setTempConfig: (config: { theme: Theme; font: string }) => void;
}

export function ModeToggle({ tempConfig, setTempConfig }: ModeToggleProps) {
    const { theme } = useTheme()

    return (
        <div className="space-y-2">
            <Label>Tema</Label>
            <RadioGroup
                defaultValue={theme}
                value={tempConfig.theme}
                onValueChange={(value: Theme) => setTempConfig({ ...tempConfig, theme: value })}
                className="grid grid-cols-2 gap-4"
            >
                <div>
                    <RadioGroupItem
                        value="light"
                        id="light"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="light"
                        className={cn(
                            "flex flex-col items-center justify-between rounded-md border-2 border-muted hover:cursor-pointer bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                        )}
                    >
                        <Sun className="mb-3 h-6 w-6" />
                        Claro
                    </Label>
                </div>
                <div>
                    <RadioGroupItem
                        value="dark"
                        id="dark"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="dark"
                        className={cn(
                            "flex flex-col items-center justify-between rounded-md border-2 border-muted hover:cursor-pointer bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                        )}
                    >
                        <Moon className="mb-3 h-6 w-6" />
                        Escuro
                    </Label>
                </div>
            </RadioGroup>
        </div>
    )
}
