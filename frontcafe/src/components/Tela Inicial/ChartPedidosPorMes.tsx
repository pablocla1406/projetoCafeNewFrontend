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
} from "@/components/ui/chart"
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos por Período</CardTitle>
        <CardDescription>Selecione um período para visualizar os pedidos</CardDescription>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart
            accessibilityLayer
            data={pedidosComCores}
            layout="vertical"
            margin={{
              right: 16,
            }}
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
                            Vezes
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
        </ChartContainer>
        <FiltroPIniPFin
          periodoInicial={periodoInicial}
          setPeriodoInicial={setPeriodoInicial}
          periodoFinal={periodoFinal}
          setPeriodoFinal={setPeriodoFinal}
        />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Observe quais meses tiveram mais pedidos <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Pessoal gosta de um cafezinho não ?
        </div>
      </CardFooter>
    </Card>
  )
}
