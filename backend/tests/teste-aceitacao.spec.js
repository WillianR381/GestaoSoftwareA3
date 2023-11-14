
const {By,Builder} = require('selenium-webdriver');

const urlLogin = 'http://127.0.0.1:5500/frontend/login.html';

describe('Teste de Aceitacao - Login', () => {
    let driver;

    //Login válido
    const user = {
        email: "adminadmin.com",
        senha: "senha123456"
    };
    
    //Antes de rodar o teste, vai iniciar o selenium  
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    test('Validar se exibe uma mensagem de erro após inserir um email de formato invalido', async () => {
        try {
            await driver.get(urlLogin);

            const inputEmail = await driver.findElement(By.id('email'));
            await inputEmail.sendKeys(user.email);
            
            await driver.sleep(1000);
    
            const inputSenha = await driver.findElement(By.id('senha'));
            await inputSenha.sendKeys(user.senha);
            
            await driver.sleep(2000);

            const button = await driver.findElement(By.id('btn'));
            await button.submit();
    
            await driver.sleep(1000);
            
            const campoMessagem = await driver.findElement(By.className('messagem'));

            expect(campoMessagem.getText()).resolves.toBe("Campo de email inválido");
        }catch(error){
            console.log(error);
        }
    }, 10000);

    afterEach(async () => {
        await driver.sleep(1000);
    })

    afterAll(async () => {
        await driver.quit();
    });

})