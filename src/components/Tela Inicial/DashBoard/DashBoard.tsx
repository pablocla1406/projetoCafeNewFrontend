import ChartBebidasVendidas from "./ChartBebidasVendias.tsx.tsx";
import ChartPedidosPorMes from "./ChartPedidosPorMes.tsx";
import ChartPessoasCafe from "./ChartPessoasCafe.tsx";

export default function DashBoard() {
    return (
        <div>
            <h1 className="text-4xl font-extrabold m-12 "> Dashboard </h1>
            <div className="space-y-16  items-center gap-16">
                <ChartPessoasCafe />
                <ChartBebidasVendidas />
                <ChartPedidosPorMes />
            </div>
        </div>
    );
}