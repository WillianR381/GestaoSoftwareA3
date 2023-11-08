const userService = require('../services/userService');
const { encrypt } = require('../utils/cryptography');

const login = async (req, res) => {
    const response = {
        token: null,
        message: null,
        content: null
    }
    try{
        const body = req.body;
        
        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        const data = {
            "email" : body?.email,
            "senha": body?.senha,
        }
        
        const user = await userService.login(data)

        if(!user) {
            throw new Error("Usuario não consegui logar");
        }

        response['message'] = "Usuario logado com sucesso !";
        response['content'] = {
            id: user?.id,
            nome: user?.nome,
            email: user?.email,
            permissao: user?.permissao
        };

        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Usuário e/ou senha inválido(s) !';
        return res.status(401).json(response);
    }

}

const createUser = async (req, res) => {
    const response = {
        message: null,
        created: null,
    }
    const permissao = ['admin', 'criador-de-conteudo'];

    try{
        const body = req.body;

        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        if(! permissao.includes(body?.permissao)){
            throw new Error("Permissão inválida");
        }

        const hash = encrypt(body?.senha);

        const data = {
            nome: body?.nome,
            senha: hash,
            email: body?.email,
            permissao: body?.permissao
        }
       
        const isCreated = await userService.createUser(data)

        if(!isCreated) {
            throw new Error("Não foi possível criar o usuário");
        }

        response['created'] = isCreated;
        response['message'] = "Usuário criado com sucesso !";
        return res.status(201).json(response);
    }catch (error) {
        response['message'] = 'Usuário já existe';
        response['created']= false;
        return res.status(401).json(response);
    }

   
}

module.exports = {login, createUser};