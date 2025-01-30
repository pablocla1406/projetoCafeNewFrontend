import DashBoard from "@/components/Tela Inicial/DashBoard";
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
        <DashBoard />
      </div>
    </div>
  );
}