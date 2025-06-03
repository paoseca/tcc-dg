import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import api from "../api/api";
import { Picker } from "@react-native-picker/picker"; // Lembre-se de instalar: expo install @react-native-picker/picker

export default function Register() {
  const [tipo, setTipo] = useState("comum");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [instrumentos, setInstrumentos] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");

  const cadastrar = async () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha || !cpf) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("/register", {
        nome,
        email,
        telefone,
        senha,
        cpf,
        tipo,
      });

      if (tipo === "musico") {
        await api.post("/register-musico", {
          cpf_usuario: cpf,
          instrumentos,
          localizacao,
          descricao,
        });
      }

      alert("Cadastro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.cabecalho}>
        <Text style={styles.mensagem}>Cadastro</Text>
      </Animatable.View>

      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <Animatable.View animation="fadeInUp" style={styles.containerFormulario}>
          <Text style={styles.titulo}>Tipo de Usuário</Text>
          <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>
            <Picker.Item label="Comum" value="comum" />
            <Picker.Item label="Músico" value="musico" />
          </Picker>

          <Text style={styles.titulo}>Nome</Text>
          <TextInput
            style={styles.entrada}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
          />

          <Text style={styles.titulo}>CPF</Text>
          <TextInput
            style={styles.entrada}
            value={cpf}
            onChangeText={setCpf}
            placeholder="Digite seu CPF"
            keyboardType="numeric"
          />

          <Text style={styles.titulo}>Email</Text>
          <TextInput
            style={styles.entrada}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
          />

          <Text style={styles.titulo}>Telefone</Text>
          <TextInput
            style={styles.entrada}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
          />

          <Text style={styles.titulo}>Senha</Text>
          <TextInput
            style={styles.entrada}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
          />

          <Text style={styles.titulo}>Confirmar Senha</Text>
          <TextInput
            style={styles.entrada}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Confirme sua senha"
            secureTextEntry
          />

          {tipo === "musico" && (
            <>
              <Text style={styles.titulo}>Instrumentos</Text>
              <TextInput
                style={styles.entrada}
                value={instrumentos}
                onChangeText={setInstrumentos}
                placeholder="Quais instrumentos você toca?"
              />

              <Text style={styles.titulo}>Localização</Text>
              <TextInput
                style={styles.entrada}
                value={localizacao}
                onChangeText={setLocalizacao}
                placeholder="Sua cidade ou bairro"
              />

              <Text style={styles.titulo}>Descrição</Text>
              <TextInput
                style={[styles.entrada, { height: 80 }]}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Fale um pouco sobre você"
                multiline
              />
            </>
          )}

          <TouchableOpacity style={styles.botao} onPress={cadastrar}>
            <Text style={styles.textoBotao}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkLogin} onPress={() => router.push("/auth/login")}>
            <Text style={styles.textoLogin}>
              Já tem uma conta? <Text style={styles.linkLoginTexto}>Faça login</Text>
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
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