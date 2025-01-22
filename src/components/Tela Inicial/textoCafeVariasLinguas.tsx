import { useEffect, useState } from "react";

export default function TextoCafeVariasLinguas() {
    const [nomeUsuario, setNomeUsuario] = useState({nome : ''});
    const [pedidosNoMes, setPedidosNoMes] = useState({pedidosNoMes : '0'});
    const [linguagem, setLinguagem] = useState(0);
    const [textoAtual, setTextoAtual] = useState("");
    const [velocidade, setVelocidade] = useState(150);
    const [estaDeletando, setEstaDeletando] = useState(false);
    const [mostrarMensagemInicial, setMostrarMensagemInicial] = useState(true);

    useEffect(() => {
        const nome = localStorage.getItem('nome') || ''
        const pedidosStorage = localStorage.getItem('pedidosNoMes')
        const pedidosValue = pedidosStorage === null || pedidosStorage === 'null' ? '0' : pedidosStorage
        setPedidosNoMes({pedidosNoMes: pedidosValue});
        setNomeUsuario({nome});
    }, []);

    const mensagemParaUsuario = `Olá, ${nomeUsuario.nome}! Seja bem-vindo!`;

    const mensagemTotal = [
        `Você possui ${pedidosNoMes?.pedidosNoMes || '0'} pedidos neste mês`,
        "Vamos tomar café", // Português
        "Let's have coffee", // Inglês
        "Prenons un café", // Francês
        "Lass uns Kaffee trinken", // Alemão
        "Facciamo un caffè", // Italiano
        "Vamos a tomar café", // Espanhol
        "Давайте пить кофе", // Russo
        "我們去喝咖啡", // Chinês
        "커피를 마시자", // Coreano
        "コーヒーを飲もう", // Japonês
    ];


    useEffect(() => {
        function logicaDeTexto() {
            const todooTexto = mostrarMensagemInicial ? mensagemParaUsuario : mensagemTotal[linguagem];

            if (estaDeletando) {
                setTextoAtual((prev) => prev.slice(0, prev.length - 1));
                if (textoAtual === "") {
                    setEstaDeletando(false);
                    if (!mostrarMensagemInicial) {
                        setLinguagem((prev) => (prev + 1) % mensagemTotal.length);
                    }
                    setMostrarMensagemInicial(false);
                }
            } else {
                setTextoAtual(todooTexto.slice(0, textoAtual.length + 1));
                if (textoAtual === todooTexto) {
                    setTimeout(() => {
                        setEstaDeletando(true);
                    }, mostrarMensagemInicial ? 1000 : 100); 
                }
            }
        }

        const intervalo = setTimeout(logicaDeTexto, velocidade);

        return () => {
            clearTimeout(intervalo);
        };
    }, [linguagem, textoAtual, velocidade, estaDeletando, mostrarMensagemInicial]);

    return(
        <h1 className="text-5xl font-bold text-gray-800">
            <span className="text-primary-foreground dark:text-primary">{textoAtual}</span>
            <span className="blinking-cursor dark:text-primary">|</span>
        </h1>
    );
}
