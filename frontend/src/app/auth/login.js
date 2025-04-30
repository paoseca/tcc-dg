import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable"; // animação
import axios from 'axios'; // para requisições HTTP
import { useState } from 'react';
import api from "../api/api";

export default function Login() {
  const { name } = useLocalSearchParams();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); 

  // Direcionar para a tela de recuperação de senha
  const recuperarSenha = () => {
    router.push("/auth/recuperar-senha");
  };

  // Voltar para a tela anterior
  function voltar() {
    router.back();
  }

  // Envia os dados do login para o backend
  const enviaLogin = async () => {
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!emailValido.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    setLoading(true); 

    try {
      const response = await api.post('/login', {
        email,
        senha 
      });

      console.log(response.data);
      router.push("/telas/home");

    } catch (error) {
      console.error(error);
      alert('Erro no login. Verifique seus dados e tente novamente.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.telaLogin}>
      {/* Animação do cabeçalho */}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.cabecalho}
      >
        <Text style={styles.mensagemBoasVindas}>Bem-vindo(a)!</Text>
      </Animatable.View>

      {/* Formulário animado */}
      <Animatable.View
        animation="fadeInUp"
        style={styles.areaFormulario}
      >
        {/* Campo de Email */}
        <Text style={styles.tituloCampo}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.campoTexto}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Campo de Senha */}
        <Text style={styles.tituloCampo}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.campoTexto}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* Link para recuperar senha */}
        <Text style={styles.textoEsqueceuSenha} onPress={recuperarSenha}>
          Esqueceu sua senha?
        </Text>

        {/* Botão "Acessar" */}
        <TouchableOpacity
          style={styles.botaoLogin}
          onPress={enviaLogin}
        >
          <Text style={styles.textoBotaoLogin}>
            {loading ? 'Acessando...' : 'Acessar'}
          </Text>
        </TouchableOpacity>

        {/* Botão "Cadastre-se" */}
        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.textoCadastro}>
            Não possui uma conta? <Text style={styles.textoCadastreSe}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Botão "Voltar" */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={voltar}
      >
        <Text>{name}</Text>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  telaLogin: {
    flex: 1,
    backgroundColor: "#871F78",
  },
  cabecalho: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  mensagemBoasVindas: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  areaFormulario: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  tituloCampo: {
    fontSize: 20,
    marginTop: 25,
  },
  campoTexto: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  botaoLogin: {
    backgroundColor: "#871F78",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoLogin: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  botaoVoltar: {
    backgroundColor: "#fff",
    width: "25%",
    borderRadius: 15,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 14,
    marginLeft: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  textoBotaoVoltar: {
    color: "#871F78",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  botaoCadastro: {
    marginTop: 14,
    alignSelf: "center",
  },
  textoCadastro: {
    color: "#c3c3c3",
    fontWeight: "bold",
  },
  textoCadastreSe: {
    color: "#871F78",
  },
  textoEsqueceuSenha: {
    color: "#c3c3c3",
    fontSize: 14,
    fontWeight: "bold",
  }
});