import ComponentParaEnquadramento from "./ComponentParaEnquadramento";

export default function MelhoriaEditarImagem() {
    return (
        <div className="w-full mx-auto flex flex-row items-center rounded-md shadow-md bg-background">
            <div className="w-1/2 flex flex-col justify-center pl-10">
                <h1 className="text-2xl font-bold mb-6">Personalize seu perfil com estilo!</h1>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        Clique no seu usuário no navBar e troque sua imagem de perfil em poucos segundos
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        Agora você pode personalizar a sua imagem de perfil do jeito que quiser
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 mr-3">✓</span>
                        Basta clicar na imagem e fazer o upload de uma nova imagem
                    </li>
                </ul>
            </div>

            <ComponentParaEnquadramento>
                <img src="images/EditarImagem.gif" alt="EditarImagem" className="rounded-md w-full h-auto" />
            </ComponentParaEnquadramento>
        </div>
    );
}