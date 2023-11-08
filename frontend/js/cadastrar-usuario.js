
const form = document.querySelector('#form-cadastrar-usuario');
const button = document.querySelector('button');



button.addEventListener('click', async (event) => {
    event.preventDefault();

        const nome = document.querySelector('#nome').value;
        const senha = document.querySelector('#senha').value;
        const email = document.querySelector('#email').value;
        const permissao = document.querySelector('#permissao').value;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            nome,
            email,
            senha,
            permissao,
            });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        await fetch("http://localhost:5000/user/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
                    
});


