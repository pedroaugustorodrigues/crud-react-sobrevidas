const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Rota para gerenciar dados
app.get('/pacientes', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/pacientes');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Erro ao buscar pacientes');
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

// json-server --watch db.json <- rodar banco de dados