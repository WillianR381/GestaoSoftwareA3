
const {db} = require('../db');

async function login(data){
  const { email, senha } = data;
  
  try {
   return await new Promise((resolve, reject) => {
     db.get(
        `Select * from Usuario u WHERE  u.email = ? and u.senha = ?`,
        [email, senha],
        function (error, row) {
          if (error) {
            reject(error); 
          } else {
            resolve(row); 
          }
        }
      );
    });
  } catch (error) {
    return null; 
  }
}

async function createUser(data){
  const { nome, email, senha, permissao } = data;

  try {
    return await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Usuario (nome, email, senha, permissao) VALUES (?, ?, ?, ?)`,
        [nome, email, senha, permissao],
        function (error) {
          if (error) {
            console.error(error.message);
            reject(false); 
          }
          resolve(true);
        }
      );
  });
  } catch (error) {
    console.error(error);
    return false; 
  }
}

module.exports = { login, createUser};
