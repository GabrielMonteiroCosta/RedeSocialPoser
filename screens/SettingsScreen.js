import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  const { user } = route.params; // Recebe os dados do usuário
  const [username, setUsername] = useState(user.username); // Armazena o nome atual

  const handleSave = () => {
    // Lógica para salvar o novo nome (por enquanto só vamos voltar)
    // Aqui você poderia adicionar uma lógica para atualizar o usuário em um banco de dados ou estado global
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nome de Usuário"
      />
      <Button title="Salvar Alterações" onPress={handleSave} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, margin: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: {
    height: 40,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default SettingsScreen;