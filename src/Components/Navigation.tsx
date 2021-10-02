import * as React from 'react';
import PhotosList from "./PhotosList/PhotosList";
import Favorites from "./Favorites/Favorites";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Footer from "./Footer/Footer";
import {Heading, NativeBaseProvider, Spinner, Center, HStack, Icon} from "native-base";
import {useAppDispatch, useTypedSelector} from "../store";
import {Dimensions, View, Text, Button} from "react-native";
import {photosActions} from "../store/photosReducer";
import {useEffect} from "react";
import Gallery from "./Gallery/Gallery";
import Photo from "./Photo/Photo";
import Header from "./Header/Header";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(photosActions.fetchUsers())
    }, [])
    const photosState = useTypedSelector(state => state.photos)
    if (!photosState.photos.length)
        return (
            <NativeBaseProvider>
                <View style={{height: Dimensions.get('window').height}}>
                    <Center flex={1} px="3">
                        <HStack space={2} alignItems="center">
                            <Spinner accessibilityLabel="Loading posts" size={"lg"}/>
                            <Heading color="primary.500" fontSize="md">
                                Загрузка
                            </Heading>
                        </HStack>
                    </Center>
                </View>
            </NativeBaseProvider>
        )
    return (
        <NativeBaseProvider>
            <Stack.Navigator initialRouteName={'Gallery'}>
                <Stack.Screen
                    name='Gallery'
                    component={Gallery}
                    options={{

                        header: () => <Header headerTitle={'Все изображения'}/>
                    }}
                />
                <Stack.Screen
                    name={'Favorites'}
                    component={Favorites}
                    options={{
                        header: () => <Header headerTitle={'Избранное'}/>
                    }}
                />
                <Stack.Screen
                    name={'Photo'}
                    component={Photo}
                options={{
                    header: () => <Header headerTitle={'img-' + photosState.curPhoto?.id} isBackButtonEnable={true}/>
                }}/>
            </Stack.Navigator>
        </NativeBaseProvider>
    );
};

export default Navigation;