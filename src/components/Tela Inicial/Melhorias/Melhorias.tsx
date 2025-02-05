import MelhoriaEditarImagem from "./MelhoriaEditarImagem";
import MelhoriaEnviaRelatoria from "./MelhoriaEnviaRelatoria";

export default function Melhorias() {

    return (
        <div>
            <h1 className="text-4xl font-extrabold m-12 "> Melhorias </h1>
            <div className="space-y-16 flex flex-col items-center m-15 p-15">
                <MelhoriaEnviaRelatoria />
                <MelhoriaEditarImagem />
            </div>
            
        </div>
        
    );
}