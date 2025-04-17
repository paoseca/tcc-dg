import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import api from "../api/api";

export default function Home() {
  const [user, setUser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  }, []);

  const handleEdit = () => {
    router.push("/editar");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando dados do usuário...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {user.nome}</Text>

        {/* Ícone de perfil */}
        <TouchableOpacity onPress={handleEdit}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }} // Fotografia
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Informações*/}
      {user.map((item) => (
        <View key={item.id} style={styles.userInfo}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.info}>{item.nome}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{item.email}</Text>

          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.info}>{item.telefone}</Text>
        </View>
      ))}

      {/* Botão de editar*/}
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

