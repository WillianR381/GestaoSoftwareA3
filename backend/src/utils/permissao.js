
function validatePermissao(permissao){
    return ['administrador', 'criador-de-conteudo'].includes(permissao);
}

module.exports = {validatePermissao}