import { Outlet } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from './app-sidebar';
import { ModeToggle } from '../darkMode&Toggle/toggle-moddle';


export default function NavBar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
          <BreadcrumbList>
          <BreadcrumbItem>
          <ModeToggle/>
          </BreadcrumbItem>
          
          </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-y-auto p-20">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

