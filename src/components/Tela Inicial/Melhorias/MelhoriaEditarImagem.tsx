import ComponentParaGifs from "./ComponentParaEnquadramento";

export default function MelhoriaEditarImagem() {
    return (
        <div className="w-full h-3/4 mx-auto flex flex-col-2 w-full rounded-md shadow-md bg-background">
            
            <div className="w-1/2 flex flex-col gap-2 justify-center w-full pl-10">
                <h1 className="text-2xl font-extrabold m-8"> Personalize seu perfil com estilo! </h1>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <span className="text-emerald-500 m-2">✓</span>
                        Clique no seu usuário no navBar e troque sua imagem de perfil em poucos segundos
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 m-2">✓</span>
                        Agora você pode personalizar a sua imagem de perfil do jeito que quiser
                    </li>
                    <li className="flex items-center">
                        <span className="text-emerald-500 m-2">✓</span>
                        Basta clicar na imagem e fazer o upload de uma nova imagem
                    </li>
                </ul>
            </div>

            <ComponentParaGifs>
                <img src="images/EditarImagem.gif" alt="EditarImagem" className="rounded-md w-full h-auto" />
            </ComponentParaGifs>
        </div>
        
    );
}