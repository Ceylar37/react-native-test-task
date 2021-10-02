import * as React from 'react';
import {useAppDispatch, useTypedSelector} from "../../store";
import {Button, Image} from "native-base";
import {Dimensions, View, StyleSheet, Pressable, Text} from "react-native";
import {photosActions} from "../../store/photosReducer";
import {useState} from "react";
import {useNavigation} from '@react-navigation/native'

const windowW = Dimensions.get('window').width


const Photo = () => {
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()
    const [isToggleFavoriteDisabled, setIsToggleFavoriteDisabled] = useState<boolean>(false)
    const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(false)
    const curPhoto = useTypedSelector(state => state.photos.curPhoto)
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} alt='curPhoto' source={{
                    uri: curPhoto.src,
                }}/>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    style={{backgroundColor: 'white'}}
                    disabled={isToggleFavoriteDisabled}
                    size="lg"
                    variant="subtle" onPress={(e) => {
                    setIsToggleFavoriteDisabled(true)
                    dispatch(photosActions.toggleIsFavourite())
                    setIsToggleFavoriteDisabled(false)
                }}>
                    {curPhoto.isFavorite
                        ?
                        '❤ Убрать из избранного'
                        :
                        '🤍 Добавить в избранное'
                    }
                </Button>
                <Button
                    style={{backgroundColor: 'white'}}
                    size="lg"
                    variant="subtle" onPress={() => {
                        setIsDeleteDisabled(true)
                        dispatch(photosActions.deletePhoto())
                        navigation.navigate('Gallery')
                }}
                >
                    🗑 Удалить изображение
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: windowW,
        height: windowW
    },
    imageContainer: {
        justifyContent: "center",
        height: '100%',
    },
    buttonsContainer: {
        bottom: 10,
        position: "absolute",
        borderRadius: 30,
        backgroundColor: 'white',
        width: '90%',
        overflow: "hidden"
    },
    container: {
        height: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        paddingBottom: 10
    },
})

export default Photo;