import { router } from "expo-router";
import { ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useState } from 'react';
import api from "../api/api";

export default function Register() {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função que realiza o cadastro
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
      const response = await api.post('/register', {
        nome,
        email,
        telefone,
        senha,
      });

      alert('Cadastro realizado com sucesso!');
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com animação */}
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.cabecalho}>
        <Text style={styles.mensagem}>Cadastro</Text>
      </Animatable.View>

      {/* Formulário com animação */}
      <Animatable.View animation="fadeInUp" style={styles.containerFormulario}>
        <Text style={styles.titulo}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.entrada}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.titulo}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.entrada}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.titulo}>Telefone</Text>
        <TextInput
          placeholder="Digite seu telefone"
          style={styles.entrada}
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.titulo}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.entrada}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.titulo}>Confirmar Senha</Text>
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.entrada}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkLogin} onPress={() => router.push("/auth/login")}>
          <Text style={styles.textoLogin}>
            Já tem uma conta? <Text style={styles.linkLoginTexto}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#871F78",
  },
  cabecalho: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  mensagem: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  containerFormulario: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  titulo: {
    fontSize: 20,
    marginTop: 25,
  },
  entrada: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#871F78",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkLogin: {
    marginTop: 20,
    alignSelf: "center",
  },
  textoLogin: {
    color: "#c3c3c3",
    fontWeight: "bold",
  },
  linkLoginTexto: {
    color: "#871F78",
  },
});