const sqlite3 = require('sqlite3').verbose();

const pathDb = './database.db';
const db = new sqlite3.Database(pathDb, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Conexão com banco de dados !!!");
});


function initDb() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS usuario(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL,
            permissao VARCHAR(255) NOT NULL
          );`);

     
        console.log("Tabelas criadas com sucesso !!!");
    })
}

function populateDabase() {
    db.get(`SELECT COUNT(*) as count FROM usuario`, (err, row) => {
        // if (err) {
        //     console.error(err.message);
        // } 

        if (row.count == 0) {
            db.run(`INSERT INTO usuario(nome, email, senha, permissao) VALUES
            ('admin', 'admin@salvadoreventos.com.br', 'admin123456', 'admin'),
            ('eduardo correia', 'eduardo.correia@salvadoreventos.com.br', 'eduardo123456', 'criador-de-conteudo');`);
        }
    });

    console.log("Registros criados com sucesso !!!")
}


module.exports = {db, initDb, populateDabase, };

