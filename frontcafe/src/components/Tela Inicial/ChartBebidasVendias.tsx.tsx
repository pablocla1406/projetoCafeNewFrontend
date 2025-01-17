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
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import IBebidasMaisVendidas from "@/utils/interfaces/IBebidasMaisVendidas"
import { bebidaService } from "@/service/BebidaService"
import FiltroDateChart from "./FiltroDateChart"

export default function ChartBebidasVendidas() {
  const [bebidasMaisVendidas, setBebidasMaisVendidas] = useState<IBebidasMaisVendidas[]>([])
  const [mesSelecionado, setMesSelecionado] = useState('')
  const [anoSelecionado, setAnoSelecionado] = useState('')



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
            : 'Dados do Mês Atual'}
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

        <div className="pt-6">
          <FiltroDateChart mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado} anoSelecionado={anoSelecionado} setAnoSelecionado={setAnoSelecionado} limparFiltros={limparFiltros} />
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