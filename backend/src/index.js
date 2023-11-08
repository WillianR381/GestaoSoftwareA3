const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute');

const app = express();
const db = require('./db');

db.initDb();
db.populateDabase();

const port = 5000;

//Implementando algumas configurações no projeto
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*' }));

app.use("/user", userRoute);

//Caso tente acessar uma rota desconhecida
app.use(function(req, res, next) {
  res.json({"message" : "Endpoint não encontrado"});
});


app.listen(port, () => {
  console.log(`Servidor rodando na http://localhost:${port}`)
})
