import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UsersScreen = ({ route, navigation }) => {
  const { user, userPosts } = route.params;
  const userRelatedPosts = userPosts.filter(post => post.username === user.username);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings', { user })} style={styles.settingsButton}>
        <Icon name="settings" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Informações do Usuário</Text>
      <Image source={user.profilePic} style={styles.profilePic} />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <Text style={styles.postsTitle}>Postagens do Usuário:</Text>
      <FlatList
        data={userRelatedPosts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postText}>{item.text}</Text>
            <Text style={styles.likesText}>Likes: {item.likes}</Text>
            <View>
              {item.comments.map((comment, index) => (
                <Text key={index} style={styles.commentText}>
                  <Text style={styles.commentUsername}>{comment.username}:</Text> {comment.text}
                </Text>
              ))}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: { color: '#fff', textAlign: 'center' },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: '#FFA500',
    borderRadius: 30,
    padding: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#555' },
  postsTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  post: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '100%',
  },
  postText: { fontSize: 16 },
  likesText: { color: '#007BFF' },
  commentText: { fontStyle: 'italic', marginTop: 5 },
  commentUsername: { fontWeight: 'bold' },
});

export default UsersScreen;
