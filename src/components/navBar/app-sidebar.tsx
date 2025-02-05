import * as React from "react"
import { AlignJustify,  Coffee, HandCoins, Users } from "lucide-react"

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
import useBloquearLogin from "@/hooks/useBloquearLogin"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
         })
    }
  }
  
  const isBlocked = useBloquearLogin()

  return (
    <Sidebar {...props} className="bg-white dark:bg-white">
      <SidebarHeader className="text-white">
        <TituloNavBar />
      </SidebarHeader>
      <Separator orientation="horizontal" className="my-2" />
      <div className="mt-10">
        <SidebarContent>
          <SidebarMenu>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="group">
                <AccordionTrigger 
                  className={`flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#4a3f35] dark:text-white transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-[#dcd8cc] hover:text-[#4a3f35] dark:hover:bg-[#463b37]`}>
                  <AlignJustify className="mr-2 h-4 w-4" />
                  Menu Inicial
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down hover:cursor-pointer">
                  <div className="px-2 pb-2">
                    <Link
                      to="/Home"
                      className="block py-2 text-sm text-center font-semibold text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Tela Inicial
                    </Link>
                  </div>

                  <div className="px-2 pb-2">
                    <div
                      onClick={() => handleScroll('pedidos-section')} 
                    className="block py-2 text-sm text-center font-semibold text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Meus Pedidos
                    </div>
                  </div>

                  <div className="px-2 pb-2">
                    <div
                      onClick={() => handleScroll('dashboard-section')} 
                    className="block py-2 text-sm text-center font-semibold text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Dashboard
                    </div>
                  </div>

                  <div className="px-2 pb-2">
                    <div
                      onClick={() => handleScroll('melhorias-section')} 
                    className="block py-2 text-sm text-center font-semibold text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Melhorias
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="group">
                <AccordionTrigger 
                  disabled={isBlocked}
                  title={isBlocked ? "Você não tem permissão para acessar este menu" : ""}
                  className={`flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#4a3f35] dark:text-white transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-[#dcd8cc] hover:text-[#4a3f35] dark:hover:bg-[#463b37] ${isBlocked ? 'cursor-not-allowed' : ''}`}>
                  <Coffee className="mr-2 h-4 w-4"/>
                  Bebidas
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/ListagemBebidas" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Listagem de Bebidas
                    </Link>
                    <Link to="/cadastroBebida" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Cadastro de Bebidas
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="group">
                <AccordionTrigger 
                  disabled={isBlocked}
                  title={isBlocked ? "Você não tem permissão para acessar este menu" : ""}
                  className={`flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#4a3f35] dark:text-white transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-[#dcd8cc] hover:text-[#4a3f35] dark:hover:bg-[#463b37] ${isBlocked ? 'cursor-not-allowed' : ''}`}>
                  <Users className="mr-2 h-4 w-4"/>
                  Pessoas
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/ListagemPessoas" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Listagem de Pessoas
                    </Link>
                    <Link to="/cadastroPessoa" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Cadastro de Pessoas
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="group">
                <AccordionTrigger 
                  disabled={isBlocked}
                  title={isBlocked ? "Você não tem permissão para acessar este menu" : ""}
                  className={`flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#4a3f35] dark:text-white transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-[#dcd8cc] hover:text-[#4a3f35] dark:hover:bg-[#463b37] ${isBlocked ? 'cursor-not-allowed' : ''}`}>
                  <HandCoins className="mr-2 h-4 w-4"/>
                  Pedidos
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 pb-4 space-y-2">
                    <Link to="/ListagemPedidos" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
                      Listagem de Pedidos
                    </Link>
                    <Link to="/cadastroPedido" className="block py-2 text-sm text-center text-[#4a3f35]/90 dark:text-white/90 transition-colors dark:hover:text-white hover:text-[#4a3f35] hover:cursor-pointer">
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
