import IPessoa from "./IPessoa";

export default interface IPessoadoPedido extends Omit<IPessoa, 'imagem' | 'setor' | 'permissao' | 'usuario' | 'senha'> {
}