"use client"

import {
  ChevronsUpDown,
  LogOut,
  Settings,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import DialogConfig from "./DialogConfig"
import { useEffect, useState } from "react"

export function NavUser() {
  const { isMobile } = useSidebar()
  const [userData, setUserData] = useState({
    nome: '',
    usuario: '',
    imagem: ''
  })

  useEffect(() => {
    const nome = localStorage.getItem('nome') || ''
    const usuario = localStorage.getItem('usuario') || ''
    const imagem = localStorage.getItem('imagem') || ''
    
    setUserData({ nome, usuario, imagem })
  }, [])

  const handleLogout = () => {
    // Limpar o localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('pessoa')
    localStorage.removeItem('permissao')

    localStorage.removeItem('nome')
    localStorage.removeItem('usuario')
    localStorage.removeItem('imagem')
    localStorage.removeItem('expirationTime')

    // Redirecionar para a página de login
    window.location.href = '/'
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userData.imagem ? userData.imagem : ""} alt={userData.nome ? userData.nome : "Raduken"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData.nome ? userData.nome : "Raduken"}</span>
                <span className="truncate text-xs">{userData.usuario ? userData.usuario : "Rasengan"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userData.imagem} alt={userData.nome ? userData.nome : "Raduken"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userData.nome ? userData.nome : "Raduken"}</span>
                  <span className="truncate text-xs">{userData.usuario ? userData.usuario : "Rasengan"}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DialogConfig style="" showButton={false}>
                <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
              </DialogConfig>
            </DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"/>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
