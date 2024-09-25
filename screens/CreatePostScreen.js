import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const CreatePostScreen = ({ navigation, route }) => {
  const { setData } = route.params; // Recebe a função para atualizar o feed
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('pessoal');
  const [image, setImage] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri); // Acessa a URI da imagem
      }
    });
  };

  const handleSubmit = () => {
    if (!content.trim() || !image) {
      alert('Por favor, preencha o conteúdo e selecione uma imagem.');
      return;
    }

    const newPost = {
      id: Math.random().toString(), // Gera um ID único
      username: 'Você', // Substitua pelo nome do usuário atual
      profilePic: require('../assets/fotoDePerfil.png'), // Coloque uma imagem padrão ou escolha uma
      text: content,
      image: { uri: image }, // Imagem selecionada
      likes: 0,
      comments: [],
    };

    setData(prevData => [...prevData, newPost]); // Adiciona nova postagem ao feed
    navigation.goBack(); // Navega de volta para o feed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Postagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o conteúdo da postagem"
        value={content}
        onChangeText={setContent}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Pessoal" value="pessoal" />
        <Picker.Item label="Profissional" value="profissional" />
        <Picker.Item label="Memes" value="memes" />
        {/* Adicione mais categorias conforme necessário */}
      </Picker>
      <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Postagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: { height: 50, width: '100%', marginBottom: 20 },
  imageButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: { color: '#fff', textAlign: 'center' },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default CreatePostScreen;