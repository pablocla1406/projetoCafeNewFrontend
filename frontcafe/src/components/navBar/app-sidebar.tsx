import * as React from "react"
import { ChevronDown } from "lucide-react"

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { Link } from "react-router-dom"

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
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="group">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
                  Menu Inicial
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4">
                    <Link to="/Home" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Tela Inicial
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="group">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
                  Listagens
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/ListagemBebidas" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Listagem de Bebidas
                    </Link>
                    <Link to="/ListagemPessoas" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Listagem de Pessoas
                    </Link>
                    <Link to="/ListagemPedidos" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Listagem de Pedidos
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="group">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
                  Cadastros
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/CadastroBebidas" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Cadastro de Bebidas
                    </Link>
                    <Link to="/CadastroPessoas" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Cadastro de Pessoas
                    </Link>
                    <Link to="/CadastroPedidos" className="block py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Cadastro de Pedidos
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenu>
        </SidebarContent>
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
