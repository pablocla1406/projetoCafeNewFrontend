import LoginForm from "@/components/Formularios/FormLogin/LoginForm"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-background px-4 py-8 dark:bg-gray-900">
        <div className="w-full max-w-[480px] space-y-6">
          <div className="flex items-center gap-3 pb-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="text-2xl font-semibold text-foreground dark:text-white">Appel Cafe</span>
          </div>
          
          <div className="w-full">
            <LoginForm/>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <img
          src="/src/lib/images/logincoffe.jpg"
          alt="Coffee Shop Background"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  )

}
