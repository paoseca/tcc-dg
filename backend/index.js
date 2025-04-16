const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const usersbd = {}; // simula um banco de dados temporário 

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  if (usersbd[email]) {
    return res.status(409).json({ message: 'Usuário já existe!' });
  }

  try {
    const hashSenha = await bcrypt.hash(senha, 10);
    usersbd[email] = { nome, email, telefone, senha: hashSenha };
    console.log(`Usuário ${email} cadastrado com sucesso! Dados:`, usersbd[email]);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
  }

  const usuario = usersbd[email];

  if (!usuario) {
    return res.status(401).json({ message: 'Usuário não encontrado.' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return res.status(401).json({ message: 'Senha incorreta.' });
  }

  res.status(200).json({ message: 'Login bem-sucedido!', nome: usuario.nome });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
