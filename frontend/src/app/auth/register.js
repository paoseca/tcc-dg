import { router } from "expo-router";
import { ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const cadastrar = async () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.58.167:3000/register', {
        nome,
        email,
        telefone,
        senha,
      });

      console.log(response.data);
      alert('Cadastro realizado com sucesso!');
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.Header}>
        <Text style={styles.message}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Telefone (com WhatsApp)</Text>
        <TextInput
          placeholder="Ex: (11) 91234-5678"
          style={styles.input}
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.title}>Confirmar Senha</Text>
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLinkText}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#871F78",
  },
  Header: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  containerForm: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 25,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#871F78",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
    alignSelf: "center",
  },
  loginText: {
    color: "#c3c3c3",
    fontWeight: "bold",
  },
  loginLinkText: {
    color: "#871F78",
  },
});
