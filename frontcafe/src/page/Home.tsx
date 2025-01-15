import DashBoard from "@/components/homeComponents/DashBoard";
import TextoCafeVariasLinguas from "@/components/Tela Inicial/textoCafeVariasLinguas";
import { Separator } from "@/components/ui/separator";

export default function Home() {
return(
   <div className="p-10">

   <TextoCafeVariasLinguas />
   <Separator orientation="horizontal" className="my-2 pb-1"  />
    <DashBoard />
   </div>
)

}