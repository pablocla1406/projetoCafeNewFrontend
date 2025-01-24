import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CampoComPesquisa from "./Comboboxs/CampoComPesquisa"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

interface FiltroPIniPFinProps {
    periodoInicial: string
    setPeriodoInicial: (data: string) => void
    periodoFinal: string
    setPeriodoFinal: (data: string) => void
    limparFiltros: () => void
}


export default function FiltroPIniPFin({periodoInicial, setPeriodoInicial, periodoFinal, setPeriodoFinal, limparFiltros}: FiltroPIniPFinProps) {




    const periodos = Array.from({ length: 24 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const valor = format(date, 'yyyy-MM')
        const label = format(date, 'MMMM yyyy', { locale: ptBR })
        return { valor, label }
    })

    const periodosLabels = periodos.map(p => p.label)

    const handleSelectPeriodoInicial = (selectedLabel: string) => {
        const periodo = periodos.find(p => p.label === selectedLabel)
        if (periodo) {
            setPeriodoInicial(periodo.valor)
        }
    }

    const handleSelectPeriodoFinal = (selectedLabel: string) => {
        const periodo = periodos.find(p => p.label === selectedLabel)
        if (periodo) {
            setPeriodoFinal(periodo.valor)
        }
    }

    

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filtro" className="group">
          <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 bg-transparent hover:bg-transparent hover:text-[#4a3f35] focus:ring-0">
            Filtrar por Data
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="flex gap-8 items-center justify-center">
                <div className="flex flex-col-2 p-4 space-x-6">
                  <CampoComPesquisa 
                    items={periodosLabels}
                    placeholder="Período Inicial"
                    onSelect={handleSelectPeriodoInicial}
                    selectedValue={periodos.find(p => p.valor === periodoInicial)?.label}
                  />

                  <CampoComPesquisa 
                    items={periodosLabels}
                    placeholder="Período Final"
                    onSelect={handleSelectPeriodoFinal}
                    selectedValue={periodos.find(p => p.valor === periodoFinal)?.label}
                  />
                </div>

                {(periodoInicial && periodoFinal) && (
                  <Button
                  variant='destructive'
                  onClick={limparFiltros}>
                    Limpar
                    <Trash2 className="w-4 h-4 ml-2" />
                  </Button>
                  )}
              </div>

            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
}