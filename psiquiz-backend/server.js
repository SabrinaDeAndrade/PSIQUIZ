const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // 👈 habilita CORS
app.use(express.json()); // 👈 permite receber JSON

// exemplo de rota de login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // lógica de autenticação fictícia
  if (email === 'teste@teste.com' && password === '1234') {
    res.json({ token: 'abc123xyz' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
