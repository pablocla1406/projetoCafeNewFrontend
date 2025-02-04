import ComponentParaGifs from "./ComponentParaEnquadramento";

export default function MelhoriaEditarImagem() {
    return (
        <div className="flex flex-col-2 w-full h-full srounded-md shadow-md bg-background">
            <div className="flex flex-col items-start justify-center w-full">
                <h1 className="text-lg font-extrabold mb-8"> Personalize seu perfil com estilo! </h1>
                <p>Clique no seu usuário na navbar e troque sua imagem de perfil em poucos segundos. Personalize do jeito que quiser e deixe seu perfil com a sua cara! Mostre seu estilo para todos!</p> 
            </div>

            <ComponentParaGifs alturaELargura="w-full h-3/4" >
                <img src="images/logoSiteCafe.png" alt="EditarImagem" className="rounded-md w-full h-auto" />
            </ComponentParaGifs>
        </div>
        
    );
}