import { Router } from "express";
const router = Router();

const usersbd = [
    {
      id: 1,
      nome: 'Lucas',
      cpf: '12345678900',
      email: 'bob@email.com',
      telefone: '11987654321',
      senha: '123456',
    },
    {
      id: 2,
      nome: 'João',
      cpf: '12345678900',
      email: 'joj@email.com',
      telefone: '11987654321',
      senha: '123456',
    }
  ]; // simula um banco de dados temporário 

router.get('/', async (req, res) => {
  return res.json("Olá, Mundo!")
})

//Rota para obter todos os usuários
router.get('/users', async (req, res) => {
    return res.json(usersbd)
  })

  //Rota para obter um usuário específico # Arrumar
router.get('/users/', async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ message: 'Email inválido.' });
    }
    
    let usuario = usersbd.find(user => user.email.toLowerCase() === email.toLowerCase());
  
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  
    return res.json(usuario);
  });

// Rota para cadastrar um usuário
router.post('/users', async (req, res) => {
    const { nome, cpf, email, telefone, senha } = req.body;
  
    if (!nome || !cpf || !email || !telefone || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
  
     // Verifica se o email já está cadastrado
     const usuarioExistente = usersbd.find(user => user.email === email);
  
     if (usuarioExistente) {
       return res.status(409).json({ message: 'Usuário já existe!' });
     }
  
     // Aqui você pode usar bcrypt se quiser criptografar a senha futuramente
    const novoUsuario = {
      id: usersbd.length + 1,
      nome,
      cpf,
      email,
      telefone,
      senha // Dica: futuramente use bcrypt.hash(senha, 10)
    };
  
    usersbd.push(novoUsuario);
  
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
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

export default router;