import { useEffect, useState } from "react";

export default function TextoCafeVariasLinguas() {
    const [Usuario, setUsuario] = useState({
        nome : '',
        pedidosNoMes : '0'
    });
    const [linguagem, setLinguagem] = useState(0);
    const [textoAtual, setTextoAtual] = useState("");
    const [velocidade, setVelocidade] = useState(150);
    const [estaDeletando, setEstaDeletando] = useState(false);
    const [mostrarMensagemInicial, setMostrarMensagemInicial] = useState(true);

    useEffect(() => {
        const pedidosStorage = localStorage.getItem('pedidosNoMes')
        const pedidosValue = pedidosStorage === null || pedidosStorage === 'null' ? '0' : pedidosStorage
        
        const nome = localStorage.getItem('nome') || ''
        const nomesArray = nome.split(' ')
        
        const doisPrimeirosNomes = nomesArray.slice(0, 2).join(' ')
        
        const nomeFormatado = doisPrimeirosNomes.charAt(0).toUpperCase() + doisPrimeirosNomes.slice(1).toLowerCase()

        setUsuario({nome: nomeFormatado, pedidosNoMes: pedidosValue})
    }, []);



    const mensagemParaUsuario = `Olá, ${Usuario.nome}! Seja bem-vindo!`;

    const mensagemTotal = [
        `Você possui ${Usuario.pedidosNoMes || '0'} pedidos neste mês`,
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
