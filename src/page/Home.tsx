import DashBoard from "@/components/Tela Inicial/DashBoard/DashBoard";
import Melhorias from "@/components/Tela Inicial/Melhorias/Melhorias";
import MeusPedidos from "@/components/Tela Inicial/MeusPedidos/MeusPedidos";
import TextoCafeVariasLinguas from "@/components/Tela Inicial/textoCafeVariasLinguas";
import { Separator } from "@/components/ui/separator";
import AnimatedComponentsScroll from "@/utils/functions/rolagemComEfeitos/animatedComponentsScroll";

export default function Home() {
  return (
      <div className="mx-12 p-13 space-y-12">
        <div>
          <TextoCafeVariasLinguas />
          <Separator orientation="horizontal" className="my-4" />
        </div>

        <div className="flex flex-col gap-12">
          
          <div id="pedidos-section">
            <AnimatedComponentsScroll idDiv="pedidos-scroll">
              <MeusPedidos />
            </AnimatedComponentsScroll>
          </div>

          <div id="dashboard-section">
            <AnimatedComponentsScroll idDiv="dashboard-scroll">
              <DashBoard />
            </AnimatedComponentsScroll>
          </div>

          <div id="melhorias-section">
            <AnimatedComponentsScroll idDiv="melhorias-scroll">
              <Melhorias />
            </AnimatedComponentsScroll>
          </div>
        </div>
      </div>
  );
}