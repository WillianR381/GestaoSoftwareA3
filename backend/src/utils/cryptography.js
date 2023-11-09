
function encrypt(password){
    const buff = Buffer.from(password);
    return buff.toString('base64');
}


function decrypt(password){
    let buff = Buffer.from(password, 'base64');
    return buff.toString('ascii');
} 

function isEqualsPasswordAndHash(password, hash){
    return false;
}

module.exports = {encrypt, decrypt, isEqualsPasswordAndHash}