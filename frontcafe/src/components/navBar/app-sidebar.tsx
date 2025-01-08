import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { TituloNavBar } from "./tituloNavBar"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { NavUser } from "./NavUser"


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
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4">
                    <Link to="/Home" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Tela Inicial
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="group">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
                  Listagens
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/ListagemBebidas" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Listagem de Bebidas
                    </Link>
                    <Link to="/ListagemPessoas" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Listagem de Pessoas
                    </Link>
                    <Link to="/ListagemPedidos" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Listagem de Pedidos
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="group">
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
                  Cadastros
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/cadastroBebida" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Cadastro de Bebidas
                    </Link>
                    <Link to="/cadastroPessoa" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Cadastro de Pessoas
                    </Link>
                    <Link to="/cadastroPedido" className="block py-2 text-sm  transition-colors hover:cursor-pointer">
                      Cadastro de Pedidos
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenu>
        </SidebarContent>
      </div>
      <div className="mt-auto">
        <NavUser />
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
