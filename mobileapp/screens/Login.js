import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin123') {
            Alert.alert('✅ Login Successful', 'Welcome Admin!');
            navigation.navigate('Dashboard');  
        } else {
            Alert.alert('❌ Login Failed', 'Invalid credentials');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Admin Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#8E8E8E"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#8E8E8E"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD', // Light Blue for a clean look
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#1565C0', // Deep Blue for emphasis
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        color: '#333333',
    },
    loginButton: {
        backgroundColor: '#4CAF50', // Green for success actions
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5, // Android shadow effect
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});

export default Login;
