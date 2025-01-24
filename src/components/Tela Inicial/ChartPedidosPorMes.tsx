import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
}
from "@/components/ui/chart"
import { pedidoService } from "@/service/PedidoService"
import { coresCharts } from "./coresCharts"
import { useEffect, useState } from "react"
import IPedidoPorMes from "@/utils/interfaces/IPedidoPorMes"
import FiltroPIniPFin from "../FiltroPIniPFin"

export default function ChartPedidosPorMes() {
  const [pedidosPorMeses, setPedidoPorMeses] = useState<IPedidoPorMes[]>([])
  const [periodoInicial, setPeriodoInicial] = useState<string>("")
  const [periodoFinal, setPeriodoFinal] = useState<string>("")


  
  
  
  useEffect(() => {
    async function listarPedidosporMeses() {
      try {
        const listarPedidosPorMeses = await pedidoService.listarPedidosporMes(
          periodoInicial || undefined,
          periodoFinal || undefined
        )
        setPedidoPorMeses(listarPedidosPorMeses)
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
      }
    }

    listarPedidosporMeses()
  }, [periodoInicial, periodoFinal])

  const pedidosComCores = pedidosPorMeses.map((pedido, index) => ({
    ...pedido,
    fill: coresCharts[index % coresCharts.length]
  }));


  function limparFiltros(){
    setPeriodoInicial('')
    setPeriodoFinal('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Pedidos por Período</CardTitle>
        <CardDescription className="text-lg">
          {!periodoFinal && !periodoFinal
          ? "Pedidos do mês atual"
          : `Pedidos de ${periodoInicial} a ${periodoFinal}`}
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-[500px] mx-auto">
          {pedidosComCores.length > 0 ? (
            <BarChart
              accessibilityLayer
              data={pedidosComCores}
              layout="vertical"
              margin={{
                right: 16,
                top: 0,
                bottom: 0,
                left: 0
              }}
              width={300}
              height={250}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="anoMes"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                
              />
              <XAxis dataKey="totalVendas" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Nome
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.anoMes}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Quantidade de Pedidos
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.totalVendas}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="totalVendas"
                layout="vertical"
                fill="hsl(var(--primary))"
                radius={4}
              >
                <LabelList
                  dataKey="mesAno"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="totalVendas"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-lg text-muted-foreground">
              Não existem pedidos no período selecionado
            </div>
          )}
        </ChartContainer>
        <div className="flex justify-center pt-6">
          <FiltroPIniPFin
            periodoInicial={periodoInicial}
            setPeriodoInicial={setPeriodoInicial}
            periodoFinal={periodoFinal}
            setPeriodoFinal={setPeriodoFinal}
            limparFiltros={limparFiltros}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-xl">
          Observe quais meses tiveram mais pedidos <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-base">
          Pessoal gosta de um cafezinho não ?
        </div>
      </CardFooter>
    </Card>
  )
}
