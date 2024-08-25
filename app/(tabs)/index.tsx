import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ditto = require('@/assets/images/ditto.jpg');
const snorlax = require('@/assets/images/snorlax.jpg'); // Asegúrate de usar la imagen correcta para Snorlax

export default function HomeScreen() {
    const [isInitialState, setIsInitialState] = useState(true);
    const translateY = useSharedValue(-50); // Inicializa fuera de la pantalla
    const backgroundColor = useSharedValue('#1f245c'); // Color inicial del fondo
    const titleOpacity = useSharedValue(1); // Opacidad inicial del título

    useEffect(() => {
        // Animar a 0 en 500 ms para mostrar el título
        translateY.value = withTiming(0, { duration: 500 });
    }, []);

    const animatedTitleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: titleOpacity.value,
        };
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColor.value,
        };
    });

    const handlePress = () => {
        if (isInitialState) {
            // Cambiar el color de fondo con una animación de desvanecimiento
            backgroundColor.value = withTiming('#FF6347', { duration: 500 }); // Nuevo color
            // Desvanecer el título
            titleOpacity.value = withTiming(0, { duration: 500 });
        } else {
            // Revertir cambios al estado inicial
            backgroundColor.value = withTiming('#1f245c', { duration: 500 }); // Color inicial
            translateY.value = withTiming(-50, { duration: 0 }, () => {
                translateY.value = withTiming(0, { duration: 500 }); // Reposicionar título
            });
            titleOpacity.value = withTiming(1, { duration: 500 });
        }
        setIsInitialState(!isInitialState);
    };

    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Animated.Text style={[styles.title, animatedTitleStyle]}>
                Bienvenido a tu Web preferida
            </Animated.Text>

            <Image source={isInitialState ? ditto : snorlax} style={styles.image} />

            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
                <Text style={styles.loginButtonText}>{isInitialState ? 'Iniciar' : 'Volver'}</Text>
            </TouchableOpacity>
        </Animated.View>
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
        backgroundColor: '#0e88c9',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 15,
        marginTop: 15,
        resizeMode: 'contain',
    },
});
