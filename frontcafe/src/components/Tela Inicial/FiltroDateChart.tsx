import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

interface FiltrarDateChartProps {
    mesSelecionado: string;
    setMesSelecionado: (mes: string) => void;
    anoSelecionado: string;
    setAnoSelecionado: (ano: string) => void;
    limparFiltros: () => void;
}

export default function FiltroDateChart({mesSelecionado, setMesSelecionado, anoSelecionado, setAnoSelecionado, limparFiltros}: FiltrarDateChartProps) {
    
    
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();


    return (
    <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="filtro" className="group">
            <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent">
            Filtrar por Data
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex gap-3 items-center">
                    <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Mês" />
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
                    <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent side="bottom">
                        <SelectItem value={anoAtual.toString()}>{anoAtual}</SelectItem>
                        <SelectItem value={(anoAtual - 1).toString()}>{anoAtual - 1}</SelectItem>
                        <SelectItem value={(anoAtual - 2).toString()}>{anoAtual - 2}</SelectItem>
                      </SelectContent>
                    </Select>

                    {(mesSelecionado || anoSelecionado) && (
                      <Button 
                      variant="destructive"
                      onClick={limparFiltros}>
                      Limpar

                    </Button>
                    )}
                  </div>

                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          )
}