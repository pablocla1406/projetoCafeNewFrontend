import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import {  ShoppingCart } from "lucide-react";

export default function DialogPedidos() {
    const [open, setOpen] = useState(false)

    const [dadosClientes, setDadosClientes] = useState({
        nome: "",
        pedidosNoMes: 0
    })

    useEffect(() => {
        const nome = localStorage.getItem('nome') || ''
        const pedidosStorage = localStorage.getItem('pedidosNoMes')
        const pedidosValue = pedidosStorage === null || pedidosStorage === 'null' ? '0' : pedidosStorage

        setDadosClientes({
            nome: nome,
            pedidosNoMes: Number(pedidosValue)
        })
    }, [])



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex flex-row items-center space-x-3 hover:cursor-pointer">
                    <span className="text-foreground">Ver meus pedidos:</span>
                        <ShoppingCart className="h-5 w-5" />
                </div>
            </DialogTrigger>

            <DialogContent>
            <DialogHeader>
                <DialogTitle> <span className="font-bold">Pedidos no mês atual:</span> </DialogTitle>

            </DialogHeader >
            <div className="flex flex-col items-center space-y-4 p-4">

            <div className="flex flex-row items-center space-x-4 pb-6">
                <p><span className="font-bold">Nome:</span> {dadosClientes.nome}</p>
                <p><span className="font-bold">Pedidos no mês:</span> {dadosClientes.pedidosNoMes}</p>
            </div>
            <div className="w-full">

            <img src="/images/PedidosImagem.png" alt="hummmcafezinho" className="w-full rounded-3xl" />
            </div>
            </div>

                
            </DialogContent>
        </Dialog>
    )
}