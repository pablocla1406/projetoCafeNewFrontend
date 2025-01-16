import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { format } from "date-fns"
  import { ptBR } from "date-fns/locale"


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
        <div className="flex gap-4 mt-4 ">
          <div className="space-y-2">
            <label className="text-sm font-medium">Período Inicial</label>
            <Select value={periodoInicial} onValueChange={setPeriodoInicial}>
              <SelectTrigger className="w-[200px]">
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
              <SelectTrigger className="w-[200px]">
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

    )
}