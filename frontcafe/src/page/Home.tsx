import DashBoard from "@/components/homeComponents/DashBoard";
import ContaPedidoUser from "@/components/Tela Inicial/ContaPedidoUser";
import TextoCafeVariasLinguas from "@/components/Tela Inicial/textoCafeVariasLinguas";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="p-10 space-y-20">
      <div>
      <TextoCafeVariasLinguas />
      <Separator orientation="horizontal" className="my-6" />
      </div>
      <ContaPedidoUser />
      <DashBoard />
    </div>
  );
}