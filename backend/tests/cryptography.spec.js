const { encrypt } = require("../src/utils/cryptography");


describe('Testes Unitários - cryptography', () => {
    it('Verificar se a funcao encrypt criptografa uma senha', () => {
        const senhaEncriptada = encrypt('senha123');
        
        expect(senhaEncriptada).toBe("c2VuaGExMjM=");
    });
})