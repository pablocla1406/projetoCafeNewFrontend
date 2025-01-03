import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TituloNavBar } from "./tituloNavBar"
import { Separator } from "@/components/ui/separator"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Tela Inicial",
      url: "/Home",
    },
    {
      title: "Listagens de Bebida",
      url: "/ListagemBebidas",
    },
    {
      title: "Listagens de Pessoa",
      url: "/ListagemPessoas",
    },
    {
      title: "Listagens de Pedido",
      url: "/ListagemPedidos",
    },
    {
      title: "Cadastro de Bebida",
      url: "/cadastroBebida",
    },
    {
      title: "Cadastro de Pessoa",
      url: "/cadastroPessoa",
    },
    {
      title: "Cadastro de Pedido",
      url: "/cadastroPedido",
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TituloNavBar />
      </SidebarHeader>
      <Separator orientation="horizontal" className="my-2" />
      <div className="mt-10">
        <SidebarContent>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
