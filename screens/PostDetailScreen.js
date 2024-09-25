import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando a biblioteca de ícones

const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') return; // Ignorar comentários vazios
    const newComment = { text: commentText, username: 'Você' }; // Substitua 'Você' pelo nome do usuário atual
    setComments([...comments, newComment]);
    setCommentText(''); // Limpa o campo de comentário
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Confira este post: ' + post.text, // Personalize a mensagem
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.postHeader}>
        <Image source={post.profilePic} style={styles.profilePic} />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <Image source={post.image} style={styles.postImage} />

      <TouchableOpacity onPress={handleCommentSubmit} style={styles.likeButton}>
        <Text style={styles.likeButtonText}>Curtir</Text>
      </TouchableOpacity>

      <View style={styles.commentSection}>
        <TextInput
          placeholder="Adicione um comentário..."
          style={styles.commentInput}
          value={commentText}
          onChangeText={setCommentText}
          onSubmitEditing={handleCommentSubmit}
        />
        <View>
          {comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              <Text style={styles.commentUsername}>{comment.username}:</Text> {comment.text}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  backButton: {
    marginBottom: 10,
    backgroundColor: '#FFA500',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start', // Para alinhar à esquerda
  },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: 'bold' },
  postText: { marginVertical: 10 },
  postImage: { width: '100%', height: 200, borderRadius: 5 },
  likeButton: { marginTop: 10, backgroundColor: '#FFA500', padding: 8, borderRadius: 5 },
  likeButtonText: { color: '#fff', textAlign: 'center' },
  commentSection: { marginTop: 20 },
  commentInput: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  commentText: { marginTop: 5, fontStyle: 'italic' },
  commentUsername: { fontWeight: 'bold' },
  shareButton: { marginTop: 20, backgroundColor: '#FFA500', padding: 8, borderRadius: 5 },
  shareButtonText: { color: '#fff', textAlign: 'center' },
});

export default PostDetailScreen;