import * as React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, Pressable} from 'react-native'
import {Image} from "native-base";
import {IPhoto, photosActions} from "../../store/photosReducer";
import {useNavigation} from '@react-navigation/native'
import {useAppDispatch} from "../../store";
import Footer from "../Footer/Footer";

const windowWidth = Dimensions.get('window').width - 20
const imageSize = windowWidth / 4

function PhotosList({photos}) {

    let transformedPhotos: IPhoto[][] = []
    let newArr: IPhoto[] = []
    photos.forEach((photo, index) => {
        newArr.push(photo)
        if (newArr.length === 4 || photos.length - 1 === index) {
            transformedPhotos.push(newArr)
            newArr = []
        }
    })
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <ScrollView>
                {transformedPhotos.map((photosGroup, index) => {
                    return (
                        <View style={styles.imagesGroup} key={index}>
                            {photosGroup.map(photo => {
                                return (
                                    <Pressable onPress={() => {
                                        dispatch(photosActions.changeCurPhoto({photo}))
                                        navigation.navigate('Photo')
                                    }} key={photo.id}>
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={{uri: photo.src}}
                                                style={styles.image}
                                                alt={'image'}
                                            />
                                            {photo.isFavorite
                                                ?
                                                <Text style={styles.hearthIcon}>❤</Text>
                                                :
                                                null}
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </View>
                    )
                })}
            </ScrollView>
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        display: "flex",
        width: imageSize,
        height: imageSize,
        borderRadius: 10,
        margin: 2,
    },
    imagesGroup: {
        display: "flex",
        flexDirection: "row"
    },
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    },
    hearthIcon: {
        position: "absolute",
        bottom: 2,
        left: 4,
    },
    imageContainer: {
        width: imageSize + 4,
        height: imageSize + 4,
    }
});

export default PhotosList;