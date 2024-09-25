import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => { // Largar programação pra virar animador de tela, se bem que isso tbm é programação... oh deus
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500, 
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, scaleValue]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Animated.Text style={[styles.title, { transform: [{ scale: scaleValue }] }]}>
        Poser Store
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  logo: { width: 150, height: 150, marginBottom: 20 },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#FFA500', 
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
},
});

export default SplashScreen;
