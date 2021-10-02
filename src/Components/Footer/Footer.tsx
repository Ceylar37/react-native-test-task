import * as React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {useNavigation, useRoute} from '@react-navigation/native'
import {Button} from "native-base";

const Footer = () => {
    const navigation = useNavigation<any>()
    const route = useRoute()
    return (
        <View style={styles.container}>
            <Button
                style={styles.buttonContainer}
                variant={'subtle'}
                onPress={() => {
                    navigation.navigate('Gallery')
                }}>
                <Text style={styles.buttonText}>🖥</Text>
                <Text style={route.name === 'Gallery'
                    ? [styles.buttonText, styles.activeButtonText]
                    : [styles.buttonText, styles.defaultButtonText]}>Галерея</Text>
            </Button>
            <Button
                style={styles.buttonContainer}
                variant={'subtle'}
                onPress={() => {
                    navigation.navigate('Favorites')
                }}>
                <Text style={styles.buttonText}>⭐</Text>
                <Text style={route.name === 'Favorites'
                    ? [styles.buttonText, styles.activeButtonText]
                    : [styles.buttonText, styles.defaultButtonText]}>Избранное</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonText: {
        width: '100%',
        textAlign: "center"
    },
    activeButtonText: {
        color: '#A10D99',
        fontWeight: "bold"
    },
    defaultButtonText: {
        color: 'gray',
    },
    buttonContainer: {
        backgroundColor: 'white'
    }
})

export default Footer;