import connection from '../connection.js';

export const cadastrarUsuario = (req, res) => {
  const { cpf, nome, email, senha, telefone, tipo } = req.body;

  const query = `
    INSERT INTO Usuario (cpf, nome, email, senha, telefone, tipo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [cpf, nome, email, senha, telefone, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ message: 'Erro ao cadastrar, tente novamente!' });
    }
    return res.status(201).json({ message: 'Cadastro realizado! Faça login.' });
  });
};
