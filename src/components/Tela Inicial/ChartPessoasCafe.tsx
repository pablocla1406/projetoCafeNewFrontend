import {  TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
import IPessoasAmamCafe from "@/utils/interfaces/IPessoasAmamCafe"
import { useEffect, useState } from "react"
import { pessoaService } from "@/service/PessoaService"

import FiltroDateChart from "./FiltroDateChart"
import { coresCharts} from "./coresCharts"
 
export default function ChartPessoasCafe() {
  const [pessoasAmamCafe, setPessoasAmamCafe] = useState<IPessoasAmamCafe[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState<string>("");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("");

  
  const limparFiltros = () => {
    setMesSelecionado('')
    setAnoSelecionado('')
  }

  async function listarPessoasQueMaisTomamCafe(): Promise<void> {
    const pessoasMes = await pessoaService.listarPessoasQueMaisTomamCafe(
      mesSelecionado ? parseInt(mesSelecionado) : undefined,
      anoSelecionado ? parseInt(anoSelecionado) : undefined
    );

    

    // Adicionar cores aos dados
    const pessoasComCores = pessoasMes.map((pessoa, index) => ({
      ...pessoa,
      fill: coresCharts[index % coresCharts.length]
    }));

    setPessoasAmamCafe(pessoasComCores);
  }

  useEffect(() => {
    listarPessoasQueMaisTomamCafe();
  }, [mesSelecionado, anoSelecionado]);

  return (
    <Card className="rounded-2xl shadow-2xl bg-background">
      <CardHeader>
        <CardTitle className="text-2xl">As Pessoas que Mais Amam Café</CardTitle>
        <CardDescription className="text-lg">
          {mesSelecionado && anoSelecionado 
            ? `Data Selecionada: ${mesSelecionado}/${anoSelecionado}`
            : 'Dados do Mês Atual '}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-[700px] mx-auto">
          {pessoasAmamCafe && pessoasAmamCafe.length > 0 ? (
            <BarChart
              data={pessoasAmamCafe}
              layout="vertical"
              margin={{
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
              }}
              width={300}
              height={250}
              className="overflow-visible"
            >
              <YAxis
                dataKey="nome"
                type="category"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                width={90}
                fontSize={12}
                stroke="hsl(var(--foreground))"
              />
              <XAxis 
                dataKey="vezesComprou" 
                type="number" 
                hide 
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Nome
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.nome}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Vezes
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
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
                dataKey="vezesComprou" 
                radius={5}
                fill="hsl(var(--primary))"
              />
            </BarChart>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-lg text-muted-foreground">
              Não existem pessoas que compraram café no período selecionado
            </div>
          )}
        </ChartContainer>
        <div className="flex justify-center pt-6">
          <FiltroDateChart mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado} anoSelecionado={anoSelecionado} setAnoSelecionado={setAnoSelecionado} limparFiltros={limparFiltros} />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-xl">
          Top 5 Mais Compradores <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-base">
        Será que você consegue?          
        </div>
      </CardFooter>
    </Card>
  )
}