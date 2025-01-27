import GenericTable from "@/components/table/tableGenerica";
import { DatePickerWithRange } from "@/components/RelacaoADates/DatePickerRangeDemo";
import { pedidoService } from "@/service/PedidoService";
import IPedido from "@/utils/interfaces/IPedido";
import React, { useEffect, useState } from "react";
import debounce from "@/utils/functions/debounce";
import TabelaRelatorio, { IClientStats } from "./tabelaRelatorio";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { anos, meses } from "@/utils/dadosDatas/dadosDatas";

export default function ListagemCadastro() {
    const [pedidos, SetPedidos] = useState<IPedido[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [mesSelecionado, setmesSelecionado] = useState<string>('');
    const [anoSelecionado, setAnoSelecionado] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [clientStats, setClientStats] = useState<IClientStats[]>([]);
    const [resetDates, setResetDates] = useState(false);

    
    const buscarDados = async (page: number = 1, currentFilters: Record<string, string> = {}) => {
        const { data, totalPages } = await pedidoService.listarDadosListagem(currentFilters, page, 12);
        SetPedidos(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        buscarDados(currentPage, filters);
    }, [currentPage, filters]);

    async function handleDelete(PedidoExcluidoId: string) {
        await pedidoService.deletarDadosId(PedidoExcluidoId);
        const dadosAposExclusao = pedidos.filter(pedido => pedido.id !== PedidoExcluidoId);
        SetPedidos(dadosAposExclusao);
    }

    async function handleDeleteUndo(PedidoExcluidoId: string) {
        try {
            await pedidoService.restaurarRegistro(PedidoExcluidoId);
            buscarDados(currentPage, filters);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFilter = React.useCallback(
        debounce((newFilters: Record<string, string>) => {
            SetCurrentPage(1);
            setFilters(newFilters);
        }, 800),
        []
    );

    const collumnsPedidos = [
        {key: "cliente", header: "Cliente", filterable: true},
        {key: "bebida", header: "Bebida", filterable: true},
        {key: "unitario",
        header: "Preço Unitário",
        render: (value: string | number) => {
            const valorComDecimal = parseFloat(value as string).toFixed(2);
            return `R$ ${valorComDecimal}`;
        },
        filterable: false,
        positionText: "text-right"
    },
        {key: "quantidade", header: "Quantidade", filterable: false, positionText: "text-center"},
        {key: "total", 
        header: "Total",
        render: (value: string | number) => {
            const valorComDecimal = parseFloat(value as string).toFixed(2);
            return `R$ ${valorComDecimal}`;
        },
        filterable: false,
        positionText: "text-right"
    },
        {key: "data_compra",
        header: "Data Compra", 
        render: (value: string | number) => {
            const date = new Date(value as string);
            date.setDate(date.getDate() + 1); 
            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        filterable: false},
    ]

    async function processarRelatorio() {
        try {
            const comprasMes = await pedidoService.pedidoRelatorio(
                mesSelecionado ? parseInt(mesSelecionado) : undefined,
                anoSelecionado ? parseInt(anoSelecionado) : undefined
            );

            setClientStats(comprasMes);
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error processing report:', error);
        }
    }

    return(
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <DatePickerWithRange 
                        onFilter={handleFilter} 
                        resetDates={resetDates}
                    />
                    <Button 
                        variant="destructive" 
                        onClick={() => {
                            SetCurrentPage(1);
                            setResetDates(true);
                            handleFilter({});
                            setTimeout(() => setResetDates(false), 100);
                        }} 
                    >
                        Limpar
                    </Button>
                </div>
                <div className="flex gap-3">
                    <Select value={mesSelecionado} onValueChange={setmesSelecionado}>
                        <SelectTrigger className="w-[180px] ">
                            <SelectValue placeholder="Selecione o mês" />
                        </SelectTrigger>
                        <SelectContent>
                            {meses.map((mes) => (
                                <SelectItem key={mes.value} value={mes.value}>
                                    {mes.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Ano" />
                        </SelectTrigger>
                        <SelectContent>
                            {anos.map((ano) => (
                                <SelectItem key={ano} value={ano}>
                                    {ano}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button className="btnBonito"onClick={processarRelatorio}>Processar Relatório</Button>
                </div>
                <TabelaRelatorio 
                    clients={clientStats} 
                    onClose={() => setIsDialogOpen(false)}
                    open={isDialogOpen}
                />
            </div>
            <GenericTable
                cadHref="cadastroPedido"
                data={pedidos}
                columns={collumnsPedidos}
                onDelete={handleDelete}
                onDeleteUndo={handleDeleteUndo}
                onFilter={handleFilter}
                currentPage={currentPage}
                totalPages={totalPages}
                href="cadastroPedido"
                onPageChange={SetCurrentPage}
            />
        </div>
    )
}