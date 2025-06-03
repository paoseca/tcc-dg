import { Router } from "express";
import connection from '../database/connection.js';
const router = Router();
import bcrypt from 'bcrypt';

router.get('/', async (req, res) => {
  return res.json("Olá, Mundo!")
})

//Rota para obter todos os usuários
//E obtem um usuário específico
router.get('/users', async (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.json(usersbd);
  }
  
  let usuario = usersbd.find(user => user.email.toLowerCase() === email.toLowerCase());

  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

    return res.json(usuario)
  })

// Rota para cadastrar um usuário

router.post('/register', async (req, res) => {
  const { nome, email, telefone, senha, cpf, tipo } = req.body;

  if (!nome || !email || !telefone || !senha || !cpf || !tipo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  try {
    const [existe] = await connection.query(
      'SELECT * FROM Usuario WHERE email = ? OR cpf = ?', [email, cpf]
    );

    if (existe.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe!' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    await connection.query(
      'INSERT INTO Usuario (cpf, nome, email, senha, telefone, tipo) VALUES (?, ?, ?, ?, ?, ?)',
      [cpf, nome, email, hashSenha, telefone, tipo]
    );

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

router.post('/register-musico', async (req, res) => {
  const { cpf_usuario, instrumentos, localizacao, descricao } = req.body;

  if (!cpf_usuario || !instrumentos) {
    return res.status(400).json({ message: 'CPF do usuário e instrumentos são obrigatórios!' });
  }

  try {
    const [user] = await connection.query(
      'SELECT * FROM Usuario WHERE cpf = ? AND tipo = ?',
      [cpf_usuario, 'musico']
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuário músico não encontrado!' });
    }

    // Atualizado: sem a coluna "avaliacao"
    await connection.query(
      'INSERT INTO Musico (cpf_usuario, instrumentos, localizacao, descricao) VALUES (?, ?, ?, ?)',
      [cpf_usuario, instrumentos, localizacao || null, descricao || null]
    );

    return res.status(201).json({ message: 'Dados do músico cadastrados com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

  // Rota para atualizar um usuário
  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    const { nome, cpf, email, telefone, senha } = req.body;
  
    const usuario = usersbd.find(user => user.id === parseInt(id));
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  
    usuario.nome = nome || usuario.nome;
    usuario.cpf = cpf || usuario.cpf;
    usuario.email = email || usuario.email;
    usuario.telefone = telefone || usuario.telefone;
    usuario.senha = senha || usuario.senha;
  
    return res.status(201).json({ message: 'Usuário atualizado com sucesso!', usuario: usuario });
  })
  
  // Rota para deletar um usuário
  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    const index = usersbd.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  
    usersbd.splice(index, 1); // Remove o usuário do array
  
    return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  });


// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
  }

  try {
    const [rows] = await connection.query('SELECT * FROM Usuario WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const usuario = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      usuario: {
        cpf: usuario.cpf,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo: usuario.tipo
      }
    });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export default router;