const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute');

const app = express();
const db = require('./db');

db.initDb();
db.populateDabase();


app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*' }));

app.use("/user", userRoute);

app.use(function(req, res, next) {
  res.json({"messagem" : "Endpoint não encontrado"});
});

module.exports = {app}