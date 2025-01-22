import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { format } from "date-fns"
  import { ptBR } from "date-fns/locale"
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FiltroPIniPFinProps {
    periodoInicial: string
    setPeriodoInicial: (data: string) => void
    periodoFinal: string
    setPeriodoFinal: (data: string) => void
}

export default function FiltroPIniPFin({periodoInicial, setPeriodoInicial, periodoFinal, setPeriodoFinal}: FiltroPIniPFinProps) {

    const periodos = Array.from({ length: 24 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const value = format(date, 'yyyy-MM')
        const label = format(date, 'MMMM yyyy', { locale: ptBR })
        return { value, label }
      })


    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filtro" className="group">
          <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent hover:text-[#4a3f35] focus:ring-0">
            Filtrar por Data
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="flex gap-8 items-center justify-center">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período Inicial</label>
                  <Select value={periodoInicial} onValueChange={setPeriodoInicial}>
                    <SelectTrigger className="w-[200px] hover:bg-transparent hover:text-[#4a3f35]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodos.map((periodo) => (
                        <SelectItem key={periodo.value} value={periodo.value}>
                          {periodo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Período Final</label>
                  <Select value={periodoFinal} onValueChange={setPeriodoFinal}>
                    <SelectTrigger className="w-[200px] hover:bg-transparent hover:text-[#4a3f35]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodos.map((periodo) => (
                        <SelectItem key={periodo.value} value={periodo.value}>
                          {periodo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
}