import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Redirect, router, useLocalSearchParams } from "expo-router"


export default function Register () {
    return (
        <View style={styles.container}>
            <Text>Página registro</Text>
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

    