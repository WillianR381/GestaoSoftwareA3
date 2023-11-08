
function encrypt(password){
    const buff = new Buffer(password);
    return buff.toString('base64');
}


function decrypt(password){
    let buff = new Buffer(password, 'base64');
    return buff.toString('ascii');
} 

function isEqualsPasswordAndHash(password, hash){
    return false;
}

module.exports = {encrypt, decrypt, isEqualsPasswordAndHash}