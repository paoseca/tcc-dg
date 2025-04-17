import { Router } from "express";
const router = Router();
import bcrypt from 'bcrypt';

const usersbd = [
    {
      id: Math.random().toString(36).substring(2, 15),
      nome: 'Lucas',
      cpf: '12345678900',
      email: 'bob@email.com',
      telefone: '11987654321',
      senha: 123456,
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      nome: 'João',
      cpf: '12345678900',
      email: 'joj@email.com',
      telefone: '11987654321',
      senha: 123456,
    }
  ]; // simula um banco de dados temporário 

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
  const { nome, email, telefone, senha } = req.body;
  
    if (!nome || !email || !telefone || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }
  
     // Verifica se o email já está cadastrado
     const usuarioExistente = usersbd.find(user => user.email === email);
  
     if (usuarioExistente) {
       return res.status(409).json({ message: 'Usuário já existe!' });
     }

    try {
      const hashSenha = await bcrypt.hash(senha, 10);
  
      let novoUsuario = { 
        id: Math.random().toString(36).substring(2, 15),
        nome, 
        email, 
        telefone, 
        senha: hashSenha 
      };

      usersbd.push(novoUsuario);

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      res.status(500).json({ message: 'Erro no servidor.' });
    }
  }) 
  
  
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


  //---------------------------

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
  }

  const usuario = usersbd.find(user => user.email === email);

  if (!usuario) {
    // return res.status(401).json({ message: 'Email ou senha incorretos' });
    return res.status(401).json({ message: 'Email incorretos' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    // return res.status(401).json({ message: 'Email ou senha incorretos' });
    return res.status(401).json({ message: 'senha incorretos' });
  }

  res.status(200).json({ message: 'Login bem-sucedido!', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
});

export default router;