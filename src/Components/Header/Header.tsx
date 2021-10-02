import * as React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {useNavigation} from '@react-navigation/native'
import {Button} from "native-base";
import {photosActions} from "../../store/photosReducer";
import LinearGradient from "react-native-linear-gradient";

const Header: React.FC<{ headerTitle: string, isBackButtonEnable?: boolean }> = ({headerTitle, isBackButtonEnable = false}) => {
    const navigation = useNavigation<any>()

    return (
        <View style={{backgroundColor: isBackButtonEnable ? 'black' : 'white'}}>
            <LinearGradient colors={['#800698', '#BC1399']} style={styles.container}>
                {isBackButtonEnable
                &&
                <Button
                    style={styles.goBackButtonContainer}
                    variant="unstyled" onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Text style={styles.goBackButtonText}>◀</Text>
                </Button>
                }
                <Text style={styles.text}>
                    {headerTitle}
                </Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        overflow: "hidden"
    },
    text: {
        color: 'white',
        textAlign: "center",
        fontSize: 22,
        zIndex: 99
    },
    goBackButtonContainer: {
        position: "absolute",
        height: '100%',
        top: 0,
        zIndex: 100},
    goBackButtonText: {
        color: 'white',
        top: -7,
        fontSize: 30
    }
})

export default Header;