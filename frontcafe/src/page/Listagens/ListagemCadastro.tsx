import GenericTable from "@/components/table/tableGenerica";
import { DatePickerWithRange } from "@/components/DatePickerRangeDemo";
import { pedidoService } from "@/service/PedidoService";
import IPedido from "@/utils/interfaces/IPedido";
import React, { useEffect, useState } from "react";
import debounce from "@/utils/functions/debounce";
import TabelaRelatorio, { IClientStats } from "./tabelaRelatorio";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ListagemCadastro() {
    const [pedidos, SetPedidos] = useState<IPedido[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [clientStats, setClientStats] = useState<IClientStats[]>([]);

    const currentYear = new Date().getFullYear();
    const anos = Array.from({length: 5}, (_, i) => (currentYear - 2 + i).toString());
    const meses = [
        { value: "1", label: "Janeiro" },
        { value: "2", label: "Fevereiro" },
        { value: "3", label: "Março" },
        { value: "4", label: "Abril" },
        { value: "5", label: "Maio" },
        { value: "6", label: "Junho" },
        { value: "7", label: "Julho" },
        { value: "8", label: "Agosto" },
        { value: "9", label: "Setembro" },
        { value: "10", label: "Outubro" },
        { value: "11", label: "Novembro" },
        { value: "12", label: "Dezembro" }
    ];

    const fetchData = async (page: number = 1, currentFilters: Record<string, string> = {}) => {
        const { data, totalPages } = await pedidoService.listarDadosListagem(currentFilters, page, 12);
        SetPedidos(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        fetchData(currentPage, filters);
    }, [currentPage, filters]);

    async function handleDelete(id: string) {
        await pedidoService.deletarDadosId(id);
        const dadosAposExclusao = pedidos.filter(pedido => pedido.id !== id);
        SetPedidos(dadosAposExclusao);
    }

    async function handleDeleteUndo(PedidoExcluidoId: string) {
        try {
            await pedidoService.restaurarRegistro(PedidoExcluidoId);
            fetchData(currentPage, filters);
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
        {key: "id", header: "ID", filterable: true},
        {key: "cliente", header: "Cliente", filterable: true},
        {key: "bebida", header: "Bebida", filterable: true},
        {key: "unitario", header: "Preço Unitário", filterable: false},
        {key: "quantidade", header: "Quantidade", filterable: false},
        {key: "total", header: "Total", filterable: false},
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
        console.log('Processing report with:', { selectedMonth, selectedYear });
        try {
            const comprasMes = await pedidoService.pedidoRelatorio(
                selectedMonth ? parseInt(selectedMonth) : undefined,
                selectedYear ? parseInt(selectedYear) : undefined
            );
            console.log('Report data received:', comprasMes);
            setClientStats(comprasMes);
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error processing report:', error);
        }
    }

    return(
        <div className="space-y-4">
            <div className="flex justify-between">
                <DatePickerWithRange onFilter={handleFilter} />
                <div className="flex gap-3">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[180px]">
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
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
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
                    <Button onClick={processarRelatorio}>Processar Relatório</Button>
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