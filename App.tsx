import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from "./src/store";
import {Provider} from "react-redux";
import Navigation from "./src/Components/Navigation";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </NavigationContainer>
    );
}

export default App;