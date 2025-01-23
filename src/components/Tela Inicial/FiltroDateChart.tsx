import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { CalendarSearch } from "lucide-react";

interface FiltrarDateChartProps {
  mesSelecionado: string;
  setMesSelecionado: (mes: string) => void;
  anoSelecionado: string;
  setAnoSelecionado: (ano: string) => void;
  limparFiltros: () => void;
}

export default function FiltroDateChart({
  mesSelecionado,
  setMesSelecionado,
  anoSelecionado,
  setAnoSelecionado,
  limparFiltros,
}: FiltrarDateChartProps) {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();

  return (
    <Accordion type="single" collapsible className="w-full mb-6"> 
      <AccordionItem value="filtro" className="group">
        <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent hover:text-[#4a3f35] focus:ring-0">
          Filtrar por Data
          <CalendarSearch className="w-4 h-4" />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="flex gap-8 items-center justify-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mês</label>
                <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                  <SelectTrigger className="w-[200px] border border-gray-300 rounded-lg transition-all focus:ring-0 focus:outline-none hover:bg-transparent hover:text-[#4a3f35] hover:border-gray-300">
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="1">Janeiro</SelectItem>
                    <SelectItem value="2">Fevereiro</SelectItem>
                    <SelectItem value="3">Março</SelectItem>
                    <SelectItem value="4">Abril</SelectItem>
                    <SelectItem value="5">Maio</SelectItem>
                    <SelectItem value="6">Junho</SelectItem>
                    <SelectItem value="7">Julho</SelectItem>
                    <SelectItem value="8">Agosto</SelectItem>
                    <SelectItem value="9">Setembro</SelectItem>
                    <SelectItem value="10">Outubro</SelectItem>
                    <SelectItem value="11">Novembro</SelectItem>
                    <SelectItem value="12">Dezembro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ano</label>
                <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                  <SelectTrigger className="w-[200px] border border-gray-300 rounded-lg transition-all focus:ring-0 focus:outline-none hover:bg-transparent hover:text-[#4a3f35] hover:border-gray-300">
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={(anoAtual - 1).toString()}>{anoAtual - 1}</SelectItem>
                    <SelectItem value={anoAtual.toString()}>{anoAtual}</SelectItem>
                    <SelectItem value={(anoAtual + 1).toString()}>{anoAtual + 1}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botão de limpar */}
              {(mesSelecionado || anoSelecionado) && (
                <Button
                  variant="destructive"
                  onClick={limparFiltros}
                  className="hover:bg-red-600 focus:ring-0 mt-6"
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
