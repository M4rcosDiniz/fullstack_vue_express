//Framework para gerencimento das rotas e das chamdas da api
const express = require('express');
//Faz o parse dos atributos enviados no body da requisição
const bodyParser = require('body-parser');
//Gerencia a permissão de acesso a aplicação e quais metodos podem ser usados (GET, PUT, DELETE, etc...)
const cors = require('cors');

const app = express();

//MiddleWares
app.use(bodyParser.json());
app.use(cors());

//Importa o arquivo que define a rota dos posts (Similar a classe controller no C#)
const posts = require('./routes/api/posts');

//Define a URL para chamada da requisição do recurso posts
app.use('/api/posts', posts)

//define a porta que o servidor usara para escutar as requisições
const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log(`Servidor ouvindo na porta ${port}`)});