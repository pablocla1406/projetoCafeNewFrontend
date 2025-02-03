import DashBoard from "@/components/Tela Inicial/DashBoard/DashBoard";
import Melhorias from "@/components/Tela Inicial/Melhorias/Melhorias";
import MeusPedidos from "@/components/Tela Inicial/MeusPedidos/MeusPedidos";
import TextoCafeVariasLinguas from "@/components/Tela Inicial/textoCafeVariasLinguas";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="">
      <div className="p-10 space-y-20">
        <div>
          <TextoCafeVariasLinguas />
          <Separator orientation="horizontal" className="my-6 " />
        </div>

        <div className="flex flex-col gap-16">
        <MeusPedidos />
        <DashBoard />
        <Melhorias />

        </div>
      </div>
    </div>
  );
}