export function AdicionarItemUnico<T extends {id: string}>(array: T[], NovoItem: T): T[] {
    if(array.find((item) => item.id === NovoItem.id)){
        return array;
    }
    return [...array, NovoItem];
    
}


export function RemoverItem<T extends {id: string}>(array: T[], id: string): T[]{
    return array.filter((item) => item.id !== id);

}