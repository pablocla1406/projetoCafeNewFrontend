import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TituloNavBar } from "./tituloNavBar"
import { Separator } from "@/components/ui/separator"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Tela Inicial",
      url: "/",
    },
    {
      title: "Listagens de Bebida",
      url: "/bebida-cadastro",
    },
    {
      title: "Listagens de Pessoa",
      url: "/listagem-pessoa",
    },
    {
      title: "Listagens de Pedido",
      url: "/pedido-cadastro",
    },
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
