import { useEffect, useState } from "react";

export default function ContaPedidoUser() {
    const [pedidosNoMes, setPedidosNoMes] = useState({pedidosNoMes : ""});

    useEffect(() => {
        const pedidosNoMes = localStorage.getItem('pedidosNoMes') || 0
        setPedidosNoMes({pedidosNoMes: pedidosNoMes.toString()});
    }, []);

    return (
        <div>
            <h1>Voce já possui {pedidosNoMes.pedidosNoMes} pedidos neste mês</h1>
        </div>
    )
}


