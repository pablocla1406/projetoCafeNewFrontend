import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Settings, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./darkMode&Toggle/toggle-moddle";

export default function BotaoConfig() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Settings className="h-4 w-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="p-2 flex flex-col gap-2 relative">
                <DropdownMenuItem asChild>
                <Button
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1 h-6 w-6 hover:bg-muted-foreground hover:cursor-pointer" 
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <ModeToggle />
              </DropdownMenuItem>

                </div>

            </DropdownMenuContent>

        </DropdownMenu>

    )
}