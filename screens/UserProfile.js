import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserProfile = ({ route, navigation }) => {
  const { userProfile } = route.params; // Recebe os dados do usuário

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Image source={userProfile.profilePic} style={styles.profilePic} />
      <Text style={styles.username}>{userProfile.username}</Text>
      <Text style={styles.email}>{userProfile.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: { color: '#fff', textAlign: 'center' },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#555' },
});

export default UserProfile;