import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
const imageLogin = require('@/assets/images/villano.jpg');
import Animated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

export default function HomeScreen() {

  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = width.value + 50;
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bienvenido a tu Web preferida</Text>
      <Image source={imageLogin} style={styles.image} />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#1f245c',
      alignItems: 'center',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 40,
      color: '#0e88c9',
  },
  loginButton: {
      marginTop: 13,
      padding: 10,
      borderRadius: 5,
      width: '50%',
      backgroundColor: '#0e88c9', // Background color of the button
      alignItems: 'center', // Center text horizontally
  },
  loginButtonText: {
      color: '#fff', // Text color of the button
      fontSize: 16,
      fontWeight: 'bold',
  },
  image: {
      width: 250, // Adjust width as needed
      height: 250, // Adjust height as needed
      marginBottom: 15,
      marginTop: 15, // Add space between image and other elements
      resizeMode: 'contain', // Ensure the image is not stretched
  },
});