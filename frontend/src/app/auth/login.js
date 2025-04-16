import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const { name } = useLocalSearchParams();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const recuperarSenha = () => {
    router.push("/auth/recuperar-senha");
  };

  function back() {
    router.back();
  }

  const enviaLogin = async () => {
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValido.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.58.167:3000/login', {
        email,
        senha 
      });

      console.log(response.data);
      alert('Login bem-sucedido'); // pode remover depois
      router.push("/telas/home");

    } catch (error) {
      console.error(error);
      alert('Erro no login. Verifique seus dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.Header}
      >
        <Text style={styles.message}>Bem vindo (a)</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite um Email.."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
          Esqueceu sua senha?
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={enviaLogin}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Acessando...' : 'Acessar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.registerText}>
            Não possui uma conta? <Text style={styles.registerCad}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity
        style={styles.button2}
        onPress={back}
      >
        <Text>{name}</Text>
        <Text style={styles.buttonTextVolt}>voltar</Text>
      </TouchableOpacity>
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
  button2: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextVolt: {
    color: "#871F78",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#c3c3c3",
    fontWeight: "bold",
  },
  registerCad: {
    color: "#871F78",
  },
  back: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textEsqueceuSenha: {
    color: "#c3c3c3",
    fontSize: 14,
    fontWeight: "bold",
  }
});
