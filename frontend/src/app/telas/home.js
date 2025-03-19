import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Redirect, router, useLocalSearchParams } from "expo-router"


export default function Home () {
    return (
        <View style={styles.container}>
            <Text>Página Home</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: { 
        flex: 1, 
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

    