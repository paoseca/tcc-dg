import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';  // Para enviar e-mails
import crypto from 'crypto';  // Para gerar um token de recuperação
import dotenv from 'dotenv';

dotenv.config();
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Sua senha deve ter pelo menos 6 caracteres.' });
        }

        if (usersbd[email]) {
            return res.status(409).json({ message: 'Usuário já existe!' });
        }

        const cript = await bcrypt.hash(password, 10);

        console.log(`Hash gerado para a senha: ${cript}`);

        usersbd[email] = { email, password: cript };

        console.log(`Usuário ${email} cadastrado com sucesso!`);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.log('Erro ao tentar cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }   
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = usersbd[email];

    if (!email || !password) {
        return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
    }

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
});

app.post ('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    const user = usersbd[email];

    if (!user) {
        return res.status(404).json({ message: 'Usuário não foi encontrado'});
    }

    //token
    const token = crypto.randomBytes(20).toString('hex');

    //guarda token
    user.recoveryToken = token;

    //simulação de envio de email
    try {
        //cofigura email real
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            logger: true,  // Habilita logs
            debug: true    // Habilita mensagens de depuração
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha',
            text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://192.168.58.167:3000/reset-password/${token}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Instruções para recuperação de senha foram enviadas para o seu e-mail.' });
    } catch (error) {
        console.log('Erro ao enviar o e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar o e-mail de recuperação' });
    }

}) 

