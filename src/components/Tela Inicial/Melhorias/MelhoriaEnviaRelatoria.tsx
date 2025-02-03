import ComponentParaGifs from "./ComponentParaGifs";


export default function MelhoriaEnviaRelatoria() {
    return (
        <div className="flex flex-col-2 w-full rounded-md shadow-md bg-background">
            <div className="flex flex-col items-start justify-center w-full">
                <h1 className="text-lg font-extrabold mb-8"> Melhoria Envia Relatória </h1>
                <p>Melhoria Envia Relatório a partir do Discord</p> 
            </div>

            <ComponentParaGifs gifOrImage="images/logoSiteCafe.png" alturaELargura="w-full h-full" />
        </div>
    );
}