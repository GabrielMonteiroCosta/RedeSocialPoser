import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';

// Lista de usuários fictícios
const USERS = [
  { username: 'Gabriel', password: 'senha123', profilePic: require('../assets/fotoDePerfil.png') },
  { username: 'luffy', password: '123456', profilePic: require('../assets/luffy.jpg') },
  { username: 'samsung', password: '123456', profilePic: require('../assets/samsunglogo.jpg') },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = USERS.find(user => user.username === username && user.password === password);
    if (user) {
      navigation.replace('Feed', { user }); // Navega para o Feed com o usuário autenticado
    } else {
      Alert.alert('Login Inválido', 'Usuário ou senha incorretos.'); // Alerta para login inválido
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', // Cor de fundo laranja
    padding: 20 
  },
  logo: {
    width: 150, // Tamanho da logo
    height: 150,
    marginBottom: 40, // Espaçamento abaixo da imagem
  },
  input: {
    height: 50,
    borderColor: '#fff', // Cor da borda branca para contrastar
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%', // Preencher toda a largura
    backgroundColor: '#fff', // Fundo dos inputs branco
  },
  button: {
    backgroundColor: '#FFA500', // Cor do botão
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Preencher toda a largura
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default LoginScreen;