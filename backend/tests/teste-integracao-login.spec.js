const request = require('supertest') ;
const { app } = require('../src/app');


describe('Testes de Integração - Login', () => {
    it('Verificar se a API retorna status code 200 ao passar email e senha válidos', async () => {
        const body = {
            email: 'admin@admin.com',
            senha: 'senha123456'
        }

        const response = await request(app).post('/user/login').send(body);
        
        expect(response.status).toBe(200);
    });

    it('Verificar se a API retorna status code 401 ao passar uma senha errada', async () => {
        const body = {
            email: 'admin@admin.com',
            senha: 'senhaerrada'
        }

        const response = await request(app).post('/user/login').send(body);
        
        expect(response.status).toBe(401);
    });

    it('Verificar os campos de retorno da API ao passar email e senha válidos', async () => {
        const body = {
            email: 'admin@admin.com',
            senha: 'senha123456'
        }

        const response = await request(app).post('/user/login').send(body);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nome');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('permissao');
    });

    it('Verificar os campos de retorno da API ao passar uma senha errada', async () => {
        const body = {
            email: 'admin@admin.com',
            senha: 'senhaerrada'
        }

        const response = await request(app).post('/user/login').send(body);
        
        expect(response.body).toHaveProperty('messagem');
    });
})