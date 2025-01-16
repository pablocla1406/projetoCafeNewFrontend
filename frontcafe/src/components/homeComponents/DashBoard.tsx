import ChartBebidasVendidas from "../Tela Inicial/ChartBebidasVendias.tsx";
import ChartPedidosPorMes from "../Tela Inicial/ChartPedidosPorMes.tsx";
import ChartPessoasCafe from "../Tela Inicial/ChartPessoasCafe.tsx";

export default function DashBoard() {
    return (
        <div className="w-[1090px] mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-8">
            <h1 className="text-2xl pb-7 font-extrabold"> Dashboard </h1>
            <div className="grid grid-cols-3 gap-4">
                <ChartPessoasCafe />
                <ChartBebidasVendidas />
                <ChartPedidosPorMes />
            </div>
        </div>
    );
}