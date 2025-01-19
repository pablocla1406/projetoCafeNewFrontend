import LoginForm from "@/components/Formularios/FormLogin/LoginForm"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-background px-4 py-8 dark:bg-zinc-800">
        <div className="w-full max-w-[480px] space-y-6">
          <div className="flex items-center gap-3 pb-20">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transform rotate-2"> */}
            <img src="/src/lib/images/logoAppel.png" alt="Logo" className="item-center w-14 h-14 mr-2 rounded-lg" />
            {/* </div> */}
            <span className="text-2xl font-semibold text-foreground dark:text-white">Appel Café</span>
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
