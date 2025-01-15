import { AlignJustify, CalendarSearch, TrendingUp } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "../ui/button"

export default function BarChartMixed() {
  const [pessoasAmamCafe, setPessoasAmamCafe] = useState<IPessoasAmamCafe[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState<string>("");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("");

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();

  
  const limparFiltros = () => {
    setMesSelecionado('')
    setAnoSelecionado('')
  }

  async function listarPessoasQueMaisTomamCafe(): Promise<void> {
    const pessoasMes = await pessoaService.listarPessoasQueMaisTomamCafe(
      mesSelecionado ? parseInt(mesSelecionado) : undefined,
      anoSelecionado ? parseInt(anoSelecionado) : undefined
    );

    // Cores vibrantes para as barras
    const cores = [
      "#FF6B6B", // Vermelho coral
      "#4ECDC4", // Turquesa
      "#45B7D1", // Azul claro
      "#96CEB4", // Verde menta
      "#FFBE0B", // Amarelo âmbar
    ];

    // Adicionar cores aos dados
    const pessoasComCores = pessoasMes.map((pessoa, index) => ({
      ...pessoa,
      fill: cores[index % cores.length]
    }));

    setPessoasAmamCafe(pessoasComCores);
  }

  useEffect(() => {
    listarPessoasQueMaisTomamCafe();
  }, [mesSelecionado, anoSelecionado]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>As Pessoas que Mais Amam Café</CardTitle>
        <CardDescription>
          {mesSelecionado && anoSelecionado 
            ? `Data Selecionada: ${mesSelecionado}/${anoSelecionado}`
            : 'Mostrando dados de todo o período'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart
            data={pessoasAmamCafe && pessoasAmamCafe.length > 0 ? pessoasAmamCafe : [
              { 
                nome: 'Nenhuma pessoa encontrada',
              }
            ]}
            layout="vertical"
            margin={{
              left: 0,
              right: 20,
              top: 0,
              bottom: 0
            }}
            height={300}
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
          
        </ChartContainer>
        <div className="pt-6">
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
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Top 5 Mais Compradores <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
        Será que você consegue passar?          
        </div>
      </CardFooter>
    </Card>
  )
}