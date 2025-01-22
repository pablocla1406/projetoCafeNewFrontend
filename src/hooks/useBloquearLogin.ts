export default function useBloquearLogin() {
    const permissaoUsuario = localStorage.getItem('permissao')
    if (permissaoUsuario === 'USER'){
        return true
    }
    return false
}