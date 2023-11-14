
const {By,Builder} = require('selenium-webdriver');

const urlLogin = 'http://127.0.0.1:5500/frontend/login.html';

const urlPainelAdministrativo = 'http://127.0.0.1:5500/frontend/painel-administrativo.html';

describe('Teste de Regressao', () => {
    let driver;

    //Login válido
    const user = {
        email: "admin@admin.com",
        senha: "senha123456"
    };
    
    //Antes de rodar o teste, vai iniciar o selenium  
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        
        // await driver.executeScript("document.querySelector('.fake-recaptcha').style.display ='block'");
    });

    test('Validar se apos implementar o recaptcha o login funciona com sucesso', async () => {
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

            expect(driver.getCurrentUrl()).resolves.toBe(urlPainelAdministrativo);
        }catch(error){
            console.log(error);
        }
    }, 10000);

    afterEach(async () => {
        await driver.sleep(1000);
    })

    afterAll(async () => {
        // await driver.sleep(3000);
        await driver.quit();
    });

})