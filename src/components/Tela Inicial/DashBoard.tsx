import ChartBebidasVendidas from "./ChartBebidasVendias.tsx.tsx";
import ChartPedidosPorMes from "./ChartPedidosPorMes.tsx";
import ChartPessoasCafe from "./ChartPessoasCafe.tsx";

export default function DashBoard() {
    return (
        <div className="w-full  rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-extrabold mb-8"> Dashboard </h1>
            <div className="space-y-8">
                <ChartPessoasCafe />
                <ChartBebidasVendidas />
                <ChartPedidosPorMes />
            </div>
        </div>
    );
}