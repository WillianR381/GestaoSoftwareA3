
const form = document.querySelector("form");
const messagemField = document.querySelector(".messagem");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;


    if(! hasEmptyField(email, senha)){
        displayMessagem("Campo de email e senha são obrigatórios");
        return;
    }
    
    if(! isValidLengthPassword(senha)){
        displayMessagem("Campo de senha inválido");
        return;
    }

    if(! isValidEmailFormat(email)){
        displayMessagem( "Campo de email inválido");
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
    .then(response => response.ok)
    .then(result => window.location = 'painel-administrativo.html')
    .catch(error => console.log('error', error));
})


function isValidLengthPassword(password){
    return password.length > 2 && password.length < 17; 
}



function isValidEmailFormat(email){
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return regex.test(email);
}

function hasEmptyField(email, password){
    return email && password
}

function displayMessagem(messagem){
    messagemField.textContent = messagem;
    messagemField.style.display = 'block';
}