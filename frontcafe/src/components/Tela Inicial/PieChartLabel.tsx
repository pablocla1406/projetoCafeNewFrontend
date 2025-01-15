import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import IBebidasMaisVendidas from "@/utils/interfaces/IBebidasMaisVendidas"
import { bebidaService } from "@/service/BebidaService"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function PieChartLabel() {
  const [bebidasMaisVendidas, setBebidasMaisVendidas] = useState<IBebidasMaisVendidas[]>([])
  const [mesSelecionado, setMesSelecionado] = useState('')
  const [anoSelecionado, setAnoSelecionado] = useState('')

  const hoje = new Date()
  const anoAtual = hoje.getFullYear()
  const anos = Array.from({length: 5}, (_, i) => anoAtual - i)

  async function listarBebidasMaisVendidas(): Promise<void> {
    const bebidas = await bebidaService.listarBebidasMaisVendidas(
      mesSelecionado ? parseInt(mesSelecionado) : undefined,
      anoSelecionado ? parseInt(anoSelecionado) : undefined
    )

    const cores = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFBE0B",
    ]

    const bebidasComCores = bebidas.map((bebida, index) => ({
      ...bebida,
      fill: cores[index % cores.length]
    }))

    setBebidasMaisVendidas(bebidasComCores)
  }

  useEffect(() => {
    listarBebidasMaisVendidas()
  }, [mesSelecionado, anoSelecionado])

  const limparFiltros = () => {
    setMesSelecionado('')
    setAnoSelecionado('')
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bebidas Mais Vendidas</CardTitle>
        <CardDescription>
          {mesSelecionado && anoSelecionado
            ? `Data Selecionada: ${mesSelecionado}/${anoSelecionado}`
            : 'Mostrando dados de todo o período'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{payload[0].name}</span>
                          <span className="text-sm text-muted-foreground">
                            Quantidade: {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={bebidasMaisVendidas}
              dataKey="quantidade"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            />
          </PieChart>
        </ChartContainer>

        <div className="pt-4">

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filtros">
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
                    <SelectContent>
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
                    <SelectContent>
                      {anos.map((ano) => (
                        <SelectItem key={ano} value={ano.toString()}>
                          {ano}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(mesSelecionado || anoSelecionado) && (
                    <Button variant="destructive" onClick={limparFiltros}>Limpar</Button>
                  )}

                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex  gap-2 font-medium leading-none">
          As Bebidas Mais Vendidas <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          E você gosta mais de qual bebida?
        </div>
      </CardFooter>
    </Card>
  )
}