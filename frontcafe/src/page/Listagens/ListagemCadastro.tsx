import GenericTable from "@/components/table/tableGenerica";
import { DatePickerWithRange } from "@/components/DatePickerRangeDemo";
import { pedidoService } from "@/service/PedidoService";
import IPedido from "@/utils/interfaces/IPedido";
import React, { useEffect, useState } from "react";

export default function ListagemCadastro() {
    const [pedidos, SetPedidos] = useState<IPedido[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    async function fetchData(page: number = 1, currentFilters: object = {}) {
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

    const handleFilter = React.useCallback((newFilters: object) => {
        SetCurrentPage(1);
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // async function handleFilter(filters: object) {
    //     SetCurrentPage(1);
    //     await fetchData(1, filters);
    // }

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
            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        filterable: false},
    ]

    return(
        <div className="space-y-4">
            <div className="flex justify-end">
                <DatePickerWithRange onFilter={handleFilter} />
            </div>
            <GenericTable
                data={pedidos}
                columns={collumnsPedidos}
                onDelete={handleDelete}
                onFilter={handleFilter}
                currentPage={currentPage}
                totalPages={totalPages}
                href="cadastroPedido"
                onPageChange={(page: number) => SetCurrentPage(page)}
            />
        </div>
    )
}