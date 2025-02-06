import ComponentParaEnquadramento from "./ComponentParaEnquadramento";



export default function MelhoriaEnviaRelatoria() {
    return (
        <div className="w-full  mx-auto flex flex-row items-center rounded-md shadow-md bg-background">
            <ComponentParaEnquadramento >
                <img src="images/EnviaRelatorioGif.gif" alt="EnviaRelatorio" className="rounded-md w-full h-auto" />
            </ComponentParaEnquadramento>
            <div className="w-1/2 flex flex-col justify-center pl-10">
                <h1 className="text-2xl font-bold mb-6"> 📊 Relatórios com Apenas um Clique! </h1>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        Agora é possível gerar relatórios completos com todos os pedidos e responsáveis!
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        E o melhor: com apenas um clique, eles podem ser enviados diretamente para o Discord!
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        Embora essa função seja exclusiva para administradores, você pode ficar tranquilo sabendo que tudo está organizado e registrado automaticamente!
                    </li>
                </ul>
            </div>

        </div>
    );
}
