const userService = require('../services/userService');
const { encrypt } = require('../utils/cryptography');
const { validatePermissao } = require('../utils/permissao');

const login = async (req, res) => {
    try{
        const body = req.body;
        
        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        const data = {
            "email" : body?.email,
            "senha": encrypt(body?.senha) ?? '' ,
        };
        
        const user = await userService.login(data);

        if(!user) {
            throw new Error("Usuario não consegui logar");
        }
        
        response = {
            id: user?.id,
            nome: user?.nome,
            email: user?.email,
            permissao: user?.permissao
        };

        return res.status(200).json(response);
    }catch (error) {
        response = {
            messagem: 'Usuário e/ou senha inválido(s) !'
        }
        return res.status(401).json(response);
    }

}

const createUser = async (req, res) => {
    const response = {
        messagem: null,
        created: null,
    }
    
    try{
        const body = req.body;

        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        if(! validatePermissao(body?.permissao)){
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
        response['messagem'] = "Usuário criado com sucesso !";
        return res.status(201).json(response);
    }catch (error) {
        response['messagem'] = 'Usuário já existe';
        response['created']= false;
        return res.status(401).json(response);
    }

   
}

module.exports = {login, createUser};