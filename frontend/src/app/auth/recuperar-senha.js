import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { useState } from "react";

export default function RecuperarSenha() {
  // Estado para armazenar o email informado pelo usuário
  const [email, setEmail] = useState("");
  // Estado para controlar o carregamento durante a requisição
  const [loading, setLoading] = useState(false);

  // Função para enviar a requisição de recuperação de senha
  const enviaRecuperacao = async () => {
    if (!email) {
      alert("Por favor, insira seu email."); // Se o campo email estiver vazio, o sistema pede para o usuário preencher
      return;
    }

    // Expressão regular para validar o formato do email (certifica que o email está em um formato padrão)
    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValido.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      // Realiza a requisição para enviar o email de recuperação de senha
      const response = await axios.post("http://192.168.58.167:3000/recuperar-senha", {
        email,
      });

      console.log(response.data);
      alert("Instruções de recuperação de senha enviadas com sucesso.");
      // Após enviar, redireciona o usuário para a tela de login 
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar solicitação de recuperação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para retornar à tela anterior 
  const back = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.Header}>
        <Text style={styles.message}>Recuperar Senha</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu Email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // (Parametro qure indica que o teclado exibirá o layout apropriado para digitação de emails)
        />
        <TouchableOpacity style={styles.button} onPress={enviaRecuperacao}>
          <Text style={styles.buttonText}>{loading ? "Enviando..." : "Enviar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={back}>
          <Text style={styles.registerText}>Voltar para Login</Text>
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
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#c3c3c3",
    fontWeight: "bold",
  },
});
