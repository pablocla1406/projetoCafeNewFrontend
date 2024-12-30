import GenericTable from "@/components/table/tableGenerica";
import { bebidaService } from "@/service/BebidaService";
import IBebida from "@/utils/interfaces/IBebida";
import { useEffect, useState } from "react";

export default function ListagemBebida(){
    const [bebidas, SetBebidas] = useState<IBebida[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);

    async function fetchData(page: number = 1, filters: object = {}) {
        const { data, totalPages } = await bebidaService.listarDadosListagem(filters, page, 12);

        SetBebidas(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);


    async function handleDelete(id: string){
        await bebidaService.deletarDadosId(id);
        const dadosAposExclusao = bebidas.filter(bebida => bebida.id !== id);
        SetBebidas(dadosAposExclusao);
    }

    async function handleFilter(filters: object) {
        SetCurrentPage(1);
        await fetchData(1, filters);
    }


    const columnsBebidas = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'nome',
            header:'Nome',
        },
        {
            key: 'preco',
            header: 'Preço',
            render: (value: string | number) => {
                const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                return `R$ ${numericValue.toFixed(2)}`;
            }
        },
        {
            key: 'status',
            header: 'Status',
        }
    ]


    return(
        <GenericTable
        data={bebidas}
        columns={columnsBebidas}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={SetCurrentPage}
        onDelete={handleDelete}
        onFilter={handleFilter}
        href="cadastroBebida"
        />


    )

}