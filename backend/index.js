import express from 'express';
import bcrypt from 'bcrypt';

const app = express();

let usersbd = {};

app.use(express.json());

//GET http://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey');
});

app.listen(3000, () => console.log("Up and running"));

app.post('/register', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Sua senha deve ter pelo menos 6 caracteres.' });
        }

        if (usersbd[login]) {
            return res.status(409).json({ message: 'Usuário já existe!' });
        }

        const cript = await bcrypt.hash(password, 10);

        console.log(`Hash gerado para a senha: ${cript}`);

        usersbd[login] = { login, password: cript };

        console.log(`Usuário ${login} cadastrado com sucesso!`);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.log('Erro ao tentar cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});
