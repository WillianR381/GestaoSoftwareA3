const { validateEmailFormat } = require("../src/utils/email");


describe('Testes Unitários - validateEmailFormat', () => {

    it('Verificar se a funcao validateEmailFormat retorna true ao passar um email valido', () => {
        const email = "carlos.silva@salvadoreventos.com";

        const isValidPattern = validateEmailFormat(email);
        expect(isValidPattern).toBe(true);
    })

    it('Verificar se a funcao validateEmailFormat retorna false ao passar um email invalido', () => {
        const email = "carlos.silvasalvadoreventos.com";

        const isInvalidPattern = validateEmailFormat(email);
        expect(isInvalidPattern).toBe(false);
    })

    it('Verificar se a funcao validateEmailFormat retorna false ao passar um email invalido', () => { 
        const email = "admin@admin.com";

        const isValidPattern = validateEmailFormat(email);
        expect(isValidPattern).toBe(true);
    })

})