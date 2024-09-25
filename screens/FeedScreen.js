import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando a biblioteca de ícones

const DATA = [
  {
    id: '1',
    username: 'Gabriel',
    profilePic: require('../assets/fotoDePerfil.png'),
    text: 'Essa é a minha primeira postagem!',
    image: require('../assets/RaposaPost.jpeg'),
    likes: 0,
    comments: [],
  },
  {
    id: '2',
    username: 'Monkey D. Luffy',
    profilePic: require('../assets/luffy.jpg'),
    text: 'Amo meus companheiros!',
    image: require('../assets/bando.jpg'),
    likes: 0,
    comments: [],
  },
  {
    id: '3',
    username: 'SAMSUNG',
    profilePic: require('../assets/samsunglogo.jpg'),
    text: 'Nova linha de celular SAMSUNG vem ai, não perca!',
    image: require('../assets/samsung.jpg'),
    likes: 0,
    comments: [],
    verified: true,
  },
];

const FeedScreen = ({ navigation, route }) => {
  const { user } = route.params; // Recebe os dados do usuário autenticado
  const [data, setData] = useState(DATA);

  const handleLike = (id) => {
    const newData = data.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setData(newData);
  };

  const handleComment = (id, commentText) => {
    if (commentText.trim() === '') return; // Ignorar comentários vazios
    const newData = data.map(post => {
      if (post.id === id) {
        return {
          ...post,
          comments: [...post.comments, { text: commentText, username: 'Você' }],
        };
      }
      return post;
    });
    setData(newData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
        <View style={styles.postHeader}>
          <Image source={item.profilePic} style={styles.profilePic} />
          <Text style={styles.username}>
            {item.username === user.username ? 'Você' : item.username}
          </Text>
          {item.verified && <Icon name="checkmark-circle" size={16} color="blue" style={styles.verifiedIcon} />}
        </View>
        <Text style={styles.postText}>{item.text}</Text>
        <Image source={item.image} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.interaction}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeButton}>Curtir ({item.likes})</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Adicione um comentário..."
          style={styles.commentInput}
          onSubmitEditing={({ nativeEvent }) => {
            handleComment(item.id, nativeEvent.text);
          }}
        />
      </View>
      <View>
        {item.comments.map((comment, index) => (
          <Text key={index} style={styles.commentText}>
            <Text style={styles.commentUsername}>{comment.username}:</Text> {comment.text}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Feed</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => navigation.navigate('CreatePost', { setData })} // Passa a função setData
        >
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.userButton} 
          onPress={() => navigation.navigate('Users', { user, userPosts: data })} // Passa os dados do usuário e suas postagens
        >
          <Icon name="person" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }, // Fundo laranja
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#fff' }, // Título em branco
  post: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '90%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: { fontWeight: 'bold' },
  verifiedIcon: { marginLeft: 5 }, // Estilo para o ícone de verificação
  postText: { marginVertical: 10 },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  interaction: { marginTop: 10 },
  likeButton: { color: '#007BFF', marginBottom: 10 }, // Cor do botão de curtir
  commentInput: {
    borderColor: '#FFA500', // Cor da borda laranja
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  commentText: { marginTop: 5, fontStyle: 'italic' },
  commentUsername: { fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  floatingButton: {
    backgroundColor: '#FF4500', // Cor do botão de criar postagem
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  userButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
  },
});

export default FeedScreen;