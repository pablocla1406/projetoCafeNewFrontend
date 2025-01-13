import GenericTable from "@/components/table/tableGenerica";
import { DatePickerWithRange } from "@/components/DatePickerRangeDemo";
import { pedidoService } from "@/service/PedidoService";
import IPedido from "@/utils/interfaces/IPedido";
import React, { useEffect, useState } from "react";
import debounce from "@/utils/functions/debounce";
import TabelaRelatorio, { IClientStats } from "./tabelaRelatorio";
import api from "@/service/api";
import { Button } from "@/components/ui/button";

export default function ListagemCadastro() {
    const [pedidos, SetPedidos] = useState<IPedido[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [clientStats, setClientStats] = useState<IClientStats[]>([]);

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
            date.setDate(date.getDate() + 1); // Adjusting the date to show one day ahead
            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        filterable: false},
    ]




    async function processarRelatorio (){

        const comprasMes = await api.get<IClientStats[]>(`/relatorio/compras-mensal`);
        setClientStats(comprasMes.data);
        setIsDialogOpen(true);
    }



    return(
        <div className="space-y-4">
            <div className="flex justify-end">
                <DatePickerWithRange onFilter={handleFilter} />
                <Button onClick={processarRelatorio}>Processar Relatorio</Button>

                {isDialogOpen && <TabelaRelatorio clients={clientStats}/>}
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