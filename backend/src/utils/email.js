

function validateEmailFormat(email){
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return regex.test(email);
}

module.exports = {validateEmailFormat};