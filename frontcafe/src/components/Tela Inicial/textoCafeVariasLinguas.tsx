import { useEffect, useState } from "react";

export default function TextoCafeVariasLinguas() {

         const linguas = [
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


    const [linguagem, setLinguagem] = useState(0);
    const [textoAtual, setTextoAtual] = useState("");
    const [velocidade, setVelocidade] = useState(150);
    const [estaDeletando, setEstaDeletando] = useState(false);



    useEffect(() => {
        function logicaDeTexto() {
            const todooTexto = linguas[linguagem];


            if (estaDeletando) {
                setTextoAtual((prev) => prev.slice(0, prev.length - 1));
            
            if(textoAtual === "") {
                setEstaDeletando(false);
                setLinguagem((prev) => (prev + 1) % linguas.length);
            }
        }
        else {
            setTextoAtual(todooTexto.slice(0, textoAtual.length + 1));
            if(textoAtual === todooTexto) {
                setTimeout(() => {
                    setEstaDeletando(true);
                }, 100);
            }
        }
    }

    const intervalo = setTimeout(logicaDeTexto, velocidade);

    return () => {
        clearTimeout(intervalo);
    };
}, [linguagem, textoAtual, velocidade, estaDeletando]);


return(
      <h1 className="text-4xl font-bold text-gray-800">
        <span className="text-indigo-500">{textoAtual}</span>
        <span className="blinking-cursor">|</span>
      </h1>
  );
};





