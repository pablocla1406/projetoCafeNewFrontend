export default function SelecionarImagem(event: React.ChangeEvent<HTMLInputElement>){
    return event.target.files?.length ? event.target.files[0] : null;
}
