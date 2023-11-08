const { encrypt, a } = require("../src/utils/cryptography");


describe('Test', () => {
    it('teste eeee', () => {
        const senhaEncriptada = encrypt('senha123');
        
        expect(senhaEncriptada).toBe("c2VuaGExMjM=");
    });



})