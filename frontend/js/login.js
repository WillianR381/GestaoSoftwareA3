
const form = document.querySelector("form");
const messagemField = document.querySelector(".messagem");
const emailInput = document.querySelector('input[name="email"]');
const senhaInput = document.querySelector('input[name="senha"]');


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value
    const senha = senhaInput.value

    if(! hasEmptyField(email, senha)){
        displayMessage("Campo de email e senha são obrigatórios");
        return;
    }
    
    if(! isValidLengthPassword(senha)){
        displayMessage("Campo de senha inválido");
        return;
    }

    if(! isValidEmailFormat(email)){
        displayMessage( "Campo de email inválido");
        return ;
    }

    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email,
        senha,
        });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
    };

    const response = await fetch("http://localhost:5000/user/login", requestOptions)
    .then(async response => [response.ok, await response.json()])
    .then( response => {
        const [isLogged, data] = response

        if(isLogged){
            window.location = 'painel-administrativo.html'
            return
        }

        const {messagem} = data 
        displayMessage(messagem);
    })
    .catch(error => console.log('error', error));
})


function isValidLengthPassword(password){
    return password.length > 2 && password.length < 17; 
}



function isValidEmailFormat(email){
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)?(\.[\w-]+)+$/;
    return regex.test(email);
}

function hasEmptyField(email, password){
    return email && password
}

function displayMessage(messagem){
    messagemField.textContent = messagem;
    messagemField.style.display = 'block';

    emailInput.value = ''
    senhaInput.value = ''
}