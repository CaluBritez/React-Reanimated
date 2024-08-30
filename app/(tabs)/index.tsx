import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ditto = require('@/assets/images/di.jpg');
const snorlax = require('@/assets/images/sno.jpg');

export default function HomeScreen() {

    const [isInitialState, setIsInitialState] = useState(true);
    const [titleText, setTitleText] = useState('No te duermas!!');

    const translateY = useSharedValue(-50);
    const backgroundColor = useSharedValue('#CB90C1');
    const titleOpacity = useSharedValue(1);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 1000 });
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
            // Realizar animaciones y cambios de colores
            backgroundColor.value = withTiming('#00B6B1', { duration: 1000 });
            // Desvanecer el título
            titleOpacity.value = withTiming(0, { duration: 1000 }, () => {
                setTitleText('zzzzzzzzz............');
                titleOpacity.value = withTiming(1, { duration: 1000 });
            });


        } else {
            // Revertir cambios al estado inicial
            backgroundColor.value = withTiming('#CB90C1', { duration: 1000 });
            translateY.value = withTiming(-50, { duration: 0 }, () => {
                translateY.value = withTiming(0, { duration: 1000 });
            });
            titleOpacity.value = withTiming(1, { duration: 1000 });
            setTitleText('No te duermas!!');


        }
        setIsInitialState(!isInitialState);
    };

    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Animated.Text style={[styles.title, animatedTitleStyle]}>
                {titleText}
            </Animated.Text>

            <Image source={isInitialState ? ditto : snorlax} style={styles.image} />

            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
                <Text style={[
                    styles.loginButtonText,
                    { color: isInitialState ? '#CB90C1' : '#00B6B1' }
                ]}>
                    {isInitialState ? 'Dormir' : 'Despertar'}
                </Text>
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
        color: 'black',
    },
    loginButton: {
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: 'black',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#CB90C1',
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
